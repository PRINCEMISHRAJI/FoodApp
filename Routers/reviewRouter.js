const express = require('express');
const { protectRoute } = require('../controller/authController');
const {getAllReviews, top3Reviews, getPlanReviews, createReview,
     updateReview, deleteReview} = require('../controller/reviewController')
const reviewRouter = express.Router();

reviewRouter
.route('/all')
.get(getAllReviews);

reviewRouter
.route('/top3')
.get(top3Reviews);

reviewRouter
.route('/:id')
.get(getPlanReviews);

// reviewRouter.use(protectRoute)
reviewRouter
.route('/crud/:plans')
.post(createReview)
.patch(updateReview)
.delete(deleteReview);

module.exports = reviewRouter;