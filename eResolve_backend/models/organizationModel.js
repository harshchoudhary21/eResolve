const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;

const OrganizationSchema = new Schema({
    type: {
        type: String,
        enum: ['Municipality', 'NGO'],
        required: [true, 'Organization type is required'],
    },
    name: {
        type: String,
        required: [true, 'Organization name is required'],
    },
    address: {
        coordinates: {
            type: [Number],
            required: true,
        },
        addressLine: {
            type: String,
            required: [true, 'Please add an address or road number'],
        },
        city: {
            type: String,
            required: [true, 'Please add a city'],
        },
        state: {
            type: String,
            required: [true, 'Please add a state'],
        },
    },
    contactNumber: {
        type: String,
        required: [true, 'Please add a contact number'],
        maxlength: [10, 'Contact number cannot be more than 10 characters'],
        minlength: [10, 'Contact number must be at least 10 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters'],
        validate: {
            validator: (value) => passwordRegex.test(value),
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
        select: false, // Hide password in query results
    },
    resetPasswordToken: String, // For storing hashed reset token
    resetPasswordExpire: Date, // For storing token expiry date
}, { timestamps: true });

// Indexing the address.coordinates field for geospatial queries
OrganizationSchema.index({ 'address.coordinates': '2dsphere' });

// Hashing the password before saving to the database
OrganizationSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

// Method to generate JWT token for authentication
OrganizationSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '1h',
    });
};

// Method to compare entered password with hashed password
OrganizationSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate and hash reset password token
OrganizationSchema.methods.getResetPasswordToken = function() {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expiry (e.g., 10 minutes)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken; // Return unhashed token for sending to user via email
};

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;