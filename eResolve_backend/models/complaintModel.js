const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ComplainSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: true,
        coordinates: {
            type: { type: String, default: "Point", enum: ["Point"] },
            coordinates: {
              type: [Number],
              required: [true, "Coordinates are required"],
            },
          },

    },

    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxLength: [500, 'Description can not be more than 500 characters'],
        minLength: [10, 'Description must be atleast 10 characters']
    },
    imageUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'resolved','in-progress'],
        default: 'pending'
    },

});
ComplainSchema.index({ "location.coordinates": "2dsphere" });
module.exports = mongoose.model('Complain', ComplainSchema);