const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsync');

//check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorResponse('Login first to access this resource.', 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
});

//Handling user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    }
}
