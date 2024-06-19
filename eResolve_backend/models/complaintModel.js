const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplainSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: [true, 'Location type is required'],
        },
        coordinates: {
            type: [Number],
            required: [true, 'Coordinates are required'],
        },
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters'],
        minlength: [10, 'Description must be at least 10 characters'],
    },
    imageUrls: [{
        type: String,
        required: [true, 'At least one image URL is required'],
    }],
    status: {
        type: String,
        enum: ['pending', 'resolved', 'in-progress'],
        default: 'pending',
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
    }
}, { timestamps: true });

// Indexing the location field for geospatial queries
ComplainSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Complain', ComplainSchema);