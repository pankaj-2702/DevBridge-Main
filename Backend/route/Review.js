const express = require('express');
const router  = express.Router();
const { createReview, getUserReviews } = require('../controller/Review');
const authentication = require('../middleware/authentication');

router.route('/:contractId')
    .post(authentication, createReview);             // create review

router.route('/user/:userId')
    .get(authentication, getUserReviews);            // get all reviews for a user



module.exports = router;