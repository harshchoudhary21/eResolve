const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    organizationIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }],
    complainId: {
        type: Schema.Types.ObjectId,
        ref: 'Complain',
        required: true
    },
    complainStatus: {
        type: String,
        enum: ['accepted', 'pending'], // Add 'pending' status for initial acceptance
        default: 'pending' // Set initial status to 'pending'
    },
    message: {
        type: String,
        required: true,
        maxLength: 500
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
