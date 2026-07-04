const express = require('express');
const router = express.Router();
const { getMe, updateMe, uploadPhoto, getUserById } = require('../controller/users');
const authentication = require('../middleware/authentication'); 
 const upload = require('../middleware/upload'); 


 router.route('/me').get(authentication , getMe).patch(authentication , updateMe);

 router.route('/me/photo').post(authentication, upload.single('profilePhoto'),uploadPhoto);
 router.route('/:id').get(authentication,getUserById)

module.exports = router;