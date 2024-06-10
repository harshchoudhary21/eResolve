const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



const OrganizationSchema = new Schema({
    type: {
        type: String,
        enum: ['municipality', 'ngo'],
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
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
    contactNumber: {
        type: String,
        required: [true, 'Please add a contact number'],
        maxLength: [10, 'Contact number can not be more than 10 characters'],
        minLength: [10, 'Contact number must be atleast 10 characters']
        
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be atleast 6 characters'],
        select: false //not to show the password in the response
    },


});

//Indexing the location field
OrganizationSchema.index({ "location.coordinates": "2dsphere" });

//Hashing the password
OrganizationSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

//JWT TOKEN GENERATION
OrganizationSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '1h'   
    });
}

//Match user entered password to hashed password in database
OrganizationSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
//Generate and hash password token
OrganizationSchema.methods.getResetPasswordToken = function() {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}


const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;