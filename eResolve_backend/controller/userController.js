const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsync");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Complaint = require('../models/complaintModel');

//Creating a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    console.log("hii");
    const { name, email, phoneNumber, password, role } = req.body;
    console.log(req.body);
    try {
        const user = await User.create({
            name,
            email,
            phoneNumber,
            password,
            role,
        });
        console.log(user);
        // res.status(200).json({
        //     success: true,
        //     message: "User registered successfully",
        //     user
        // });
        sendToken(user, 200, res); // Uncomment this if you have a sendToken function
    } catch (e) {
        console.log("Error :- " + e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


//Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //Checking if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorResponse('Please enter email and password', 400));
    }
    //Finding user in database
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Invalid Email or Password', 401));
    }
    //Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorResponse('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res); // Uncomment this if you have a sendToken function
});

//logout user
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
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse('User not found with this email', 404));
    }
    //Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    //Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'eResolve Password Recovery',
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorResponse('Email could not be sent', 500));
    }
}
);
//Reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const resetToken = req.params.token;
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //Find user by reset token
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: {$gt: Date.now()}
    }); 
    if(!user){
        return next(new ErrorResponse('Password reset token is invalid or has been expired', 400));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorResponse('Password does not match', 400));
    }
    //Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
})
//get user details
exports.getUserProfile = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        return next(new ErrorResponse('User not found', 404));
    }
    res.status(200).json({
        success: true,
        data: user
    })
}
);
//get all users
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        data: users
    });
});
//update user profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    sendToken(user, 200, res);
});
//update user password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');
    const {oldPassword, newPassword,confirmNewPassword} = req.body;
    if(!await user.comparePassword(oldPassword)){
        return next(new ErrorResponse('Old password is incorrect', 400));
    }
    if(newPassword !== confirmNewPassword){
        return next(new ErrorResponse('Passwords do not match', 400));
    }
    user.password = newPassword;
    await user.save();
    sendToken(user, 200, res);
}
);
//complain made by user
exports.complain = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        return next(new ErrorResponse('User not found', 404));
    }
    const{location, description, imageUrl} = req.body;
    if(!location || !description || !imageUrl){
        return next(new ErrorResponse('Please provide all the details', 400));
    }
    const complain = await Complaint.create({
        userId: req.user.id,
        location,
        description,
        imageUrl
    });
    res.status(200).json({
        success: true,
        data: complain
    });
}
);
//get all complaints made by user
exports.getComplaints = catchAsyncErrors(async(req,res,next)=>{
    const complaints = await Complaint.find({userId: req.user.id});
    res.status(200).json({
        success: true,
        data: complaints
    });
});
//delete user
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        return next(new ErrorResponse('User not found', 404));
    }
    await user.remove();
    res.status(200).json({
        success: true,
        message: 'User deleted'
    });
}
);
