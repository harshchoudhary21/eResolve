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
    message: {
        type: String,
        required: true,
        maxLength: 500
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
