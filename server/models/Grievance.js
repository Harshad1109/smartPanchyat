const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  citizenId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  category: {
    type: String,
    enum: ['road', 'water', 'electricity', 'sanitation', 'drainage', 'street-light', 'health', 'other'],
    required: [true, 'Please specify a category'],
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    minlength: [50, 'Description must be at least 50 characters long'],
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    coordinates: {
      type: [Number],
      index: '2dsphere', // geo-indexing
    },
  },
  media: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 3'],
  },
  contactMobile: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Escalated'],
    default: 'Pending',
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  deadline: {
    type: Date,
  },
  isOverdue: {
    type: Boolean,
    default: false,
  },
  resolvedAt: {
    type: Date,
  },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 3;
}

// Auto-calculate deadline before saving if priority is modified or it's new
grievanceSchema.pre('save', function (next) {
  if (this.isModified('priority') || this.isNew) {
    const daysToAdd = {
      urgent: 1,
      high: 3,
      medium: 7,
      low: 14,
    };
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + daysToAdd[this.priority || 'medium']);
    this.deadline = deadlineDate;
  }
  
  if (this.isModified('status') && this.status === 'Resolved') {
      this.resolvedAt = new Date();
  }
  
  next();
});

module.exports = mongoose.model('Grievance', grievanceSchema);
