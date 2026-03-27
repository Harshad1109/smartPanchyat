const Grievance = require('../models/Grievance');
const User = require('../models/User');
const { sendSMS } = require('../services/smsService');

// @desc    Create new grievance
// @route   POST /api/grievances
// @access  Private (Citizen)
exports.createGrievance = async (req, res) => {
    try {
        const { category, subject, description, address, coordinates, contactMobile, contactEmail, priority } = req.body;

        // Mock upload to Cloudinary - we'll just parse the memory files to pseudo-URLs 
        // In real app: cloudinary.uploader.upload_stream
        let mediaUrls = [];
        if (req.files && req.files.length > 0) {
            mediaUrls = req.files.map(file => `mock-url-for-${file.originalname}`);
        }

        // Mock Geo-location if only coordinates are provided
        // In real app: use Google Maps geocoding
        let parsedCoords = coordinates ? JSON.parse(coordinates) : undefined;

        // Auto-assign based on simple logic: Find an officer in the same ward, or any officer.
        // We will just find one officer.
        const officer = await User.findOne({ role: 'officer' }); // In prod: filter by req.user.panchayatWard

        const grievance = await Grievance.create({
            citizenId: req.user.id,
            category,
            subject,
            description,
            location: {
                address: address || 'Mock Address Based on Coords',
                coordinates: parsedCoords
            },
            media: mediaUrls,
            contactMobile,
            contactEmail,
            priority,
            assignedTo: officer ? officer._id : undefined
        });

        // Send SMS notification
        await sendSMS(
            contactMobile || req.user.phone, 
            `Your Smart Panchayat grievance has been registered. ID: ${grievance._id.toString().slice(-6)}`
        );

        res.status(201).json({
            success: true,
            data: grievance
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get all grievances
// @route   GET /api/grievances
// @access  Private (Citizen sees own, Officer sees assigned, Admin sees all)
exports.getGrievances = async (req, res) => {
    try {
        let query;

        const reqQuery = { ...req.query };

        // Fields to exclude from direct match
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
        removeFields.forEach(param => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        let parsedQuery = JSON.parse(queryStr);

        // RBAC access logic
        if (req.user.role === 'citizen') {
            parsedQuery.citizenId = req.user.id;
        } else if (req.user.role === 'officer') {
            // Officer can see things assigned to them or in their category/ward
            // For now, let's keep it simple: officers assigned to them.
            parsedQuery.assignedTo = req.user.id;
        }

        // Search logic
        if (req.query.search) {
             parsedQuery.subject = { $regex: req.query.search, $options: 'i' };
        }

        query = Grievance.find(parsedQuery).populate('citizenId', 'name phone').populate('assignedTo', 'name');

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Grievance.countDocuments(parsedQuery);

        query = query.skip(startIndex).limit(limit);

        const grievances = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = { page: page + 1, limit };
        }

        if (startIndex > 0) {
            pagination.prev = { page: page - 1, limit };
        }

        res.status(200).json({
            success: true,
            count: grievances.length,
            pagination,
            data: grievances
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update grievance status
// @route   PUT /api/grievances/:id/status
// @access  Private (Officer/Admin)
exports.updateGrievanceStatus = async (req, res) => {
    try {
        let grievance = await Grievance.findById(req.params.id);

        if (!grievance) {
            return res.status(404).json({ success: false, error: 'Grievance not found' });
        }

        // Make sure user is assigned to this grievance or is admin
        if (req.user.role === 'officer' && grievance.assignedTo.toString() !== req.user.id) {
             return res.status(403).json({ success: false, error: 'Not authorized to update this grievance' });
        }

        if (req.body.status) {
             grievance.status = req.body.status;
        }

        await grievance.save(); // triggers pre-save hook for resolvedAt if status is Resolved

        // Notify citizen if resolved
        if (grievance.status === 'Resolved') {
            await sendSMS(
                grievance.contactMobile,
                `Your grievance ID ${grievance._id.toString().slice(-6)} has been resolved.`
            );
        }

        res.status(200).json({ success: true, data: grievance });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get grievance by ID
// @route   GET /api/grievances/:id
// @access  Private
exports.getGrievanceById = async (req, res) => {
    try {
         const grievance = await Grievance.findById(req.params.id)
            .populate('citizenId', 'name phone email')
            .populate('assignedTo', 'name phone');
            
         if (!grievance) {
            return res.status(404).json({ success: false, error: 'Grievance not found' });
         }

         res.status(200).json({ success: true, data: grievance });
    } catch (err) {
         res.status(400).json({ success: false, error: err.message });
    }
};
