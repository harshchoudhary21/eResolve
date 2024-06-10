const Organization = require('../models/organizationModel');
const Notification = require('../models/notificationModel');
const AcceptedComplaint = require('../models/acceptedComplaintModel');
const ErrorResponse = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsync');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken');
const Complaint = require('../models/complaintModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const catchAsync = require('../middleware/catchAsync');

//Creating a organization
exports.registerOrganization = catchAsyncErrors(async (req, res, next) => {
    const {type,name,location,contactNumber,email,password } = req.body;
    const organization = await Organization.create({
        type,
        name,
        location,
        contactNumber,
        email,
        password

    });
    console.log(organization);
    sendToken(organization, 200, res);
});

//Login organization
exports.loginOrganization = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //Checking if email and password is entered by organization
    if (!email || !password) {
        return next(new ErrorResponse('Please enter email and password', 400));
    }
    //Finding organization in database
    const organization = await Organization.findOne({ email }).select('+password');
    if (!organization) {
        return next(new ErrorResponse('Invalid Email or Password', 401));
    }
    //Checks if password is correct or not
    const isPasswordMatched = await organization.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorResponse('Invalid Email or Password', 401));
    }
    sendToken(organization, 200, res);
});

//logout organization
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', 'logout', {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'Logged out'
    });
});

//Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const organization = await Organization.findOne ({ email: req.body.email });
    if (!organization) {
        return next(new ErrorResponse('Organization not found with this email', 404));
    }
    //Get reset token
    const resetToken = organization.getResetPasswordToken();
    await organization.save({ validateBeforeSave: false });
    //Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/organization/resetpassword/${resetToken}`;
    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
    try {
        await sendEmail({
            email: organization.email,
            subject: 'eResolve Password Recovery',
            message
        });
        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (error) {
        organization.resetPasswordToken = undefined;
        organization.resetPasswordExpire = undefined;
        await organization.save({ validateBeforeSave: false });
        return next(new ErrorResponse('Email could not be sent', 500));
    }
}
);

//Reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    const organization = await Organization.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!organization) {
        return next(new ErrorResponse('Invalid Reset Token', 400));
    }
    //Setup new password
    organization.password = req.body.password;
    organization.resetPasswordToken = undefined;
    organization.resetPasswordExpire = undefined;
    await organization.save();
    sendToken(organization, 200, res);
});

//Getting Organization Details
exports.getOrganizationDetails = catchAsyncErrors(async (req, res, next) => {
    const organization = await Organization.findById(req.organization.id);
    res.status(200).json({
        success: true,
        data: organization
    });
});

//Update organization password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const organization = await Organization.findById(req.organization.id).select('+password');
    //Check previous user password
    const{oldPassword, newPassword,confirmPassword} = req.body;
    const isMatched = await organization.comparePassword(oldPassword);
    if(!isMatched){
        return next(new ErrorResponse('Old password is incorrect', 400));

    }
    //Check if new password is same as old password
    if(oldPassword === newPassword){
        return next(new ErrorResponse('New password cannot be same as old password', 400));
    }
    //Check if new password is same as confirm password
    if(newPassword !== confirmPassword){
        return next(new ErrorResponse('Password does not match', 400));
    }
    organization.password = newPassword;
    await organization.save();
    sendToken(organization, 200, res);


});

//Update organization profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newOrganizationData = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
    };
    const organization = await Organization.findByIdAndUpdate(req.organization.id, newOrganizationData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true
    });
});

//Get all the Notifications of complaints
exports.getNotification = catchAsyncErrors(async (req, res, next) => {
    try {
        // Find the notification by its ID
        const notificationId = req.params.notificationId; // Assuming you have a route parameter for the notification ID
        const notification = await Notification.findById(notificationId)
            .populate('complainId') // Populate the complain reference
            .exec();

        if (!notification) {
            // Handle case when notification is not found
            return res.status(404).json({
                success: false,
                message: 'Notification not found',
            });
        }

        // You can customize the response format as needed
        res.status(200).json({
            success: true,
            notification,
        });
    } catch (error) {
        // Handle any errors (e.g., invalid ID, database connection issues)
        console.error('Error fetching notification:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching notification',
        });
    }
});

//Get all the accepted complaints
exports.getAcceptedComplaints = catchAsyncErrors(async (req, res, next) => {
    const acceptedComplaints = await AcceptedComplaint.find({ organizationIds: req.organization.id });
    res.status(200).json({
        success: true,
        data: acceptedComplaints
    });
}
);




