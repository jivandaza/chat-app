import express from 'express';
import registerUserCtrl from '../controller/user/registerUser.js';
import checkEmailCtrl from '../controller/user/checkEmail.js';
import checkPasswordCtrl from '../controller/user/checkPassword.js';
import userDetailsCtrl from '../controller/user/userDetails.js';
import logoutCtrl from '../controller/user/logout.js';
import updateUserDetailsCtrl from '../controller/user/updateUserDetails.js';
import searchUserCtrl from '../controller/user/searchUser.js';


const router = express.Router()

router.post('/register', registerUserCtrl);
router.post('/email', checkEmailCtrl);
router.post('/password', checkPasswordCtrl);
router.get('/user-details', userDetailsCtrl);
router.get('/logout', logoutCtrl);
router.post('/update-user', updateUserDetailsCtrl);
router.post('/search-user', searchUserCtrl);

export default router;