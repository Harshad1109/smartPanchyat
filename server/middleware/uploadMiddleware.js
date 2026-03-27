const multer = require('multer');

// Instead of actual Cloudinary connection right now, we will mock the storage 
// but define the middleware structure so it's easy to swap later.

const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;
