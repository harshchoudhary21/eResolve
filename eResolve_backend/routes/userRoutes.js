const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    getAllUsers,
    updateProfile,
    updatePassword,
    complain,
    getComplaints,
    deleteUser
} = require('../Controller/userController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authentications');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/users').get(isAuthenticatedUser, authorizeRoles('user'), getAllUsers);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/complain').post(isAuthenticatedUser, complain);
router.route('/me/pastComplaints').get(isAuthenticatedUser, getComplaints);
router.route('/:id').delete(isAuthenticatedUser, deleteUser);

module.exports = router;

