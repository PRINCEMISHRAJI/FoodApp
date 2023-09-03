const reviewModels = require('../models/reviewModels');
const planModels = require('../models/planModels');

module.exports.getAllReviews = async function getAllReviews(req,res){
    try {
        let reviews = await reviewModels.find();
        if(reviews){
            return res.json({
                message : "Reviews retrieved",
                data : reviews
            });
        }else {
            return res.json({
                message : "No reviews found"
            });
        }
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}

module.exports.top3Reviews = async function top3Reviews(req,res){
    try {
        let reviews = await reviewModels.find().sort({
            ratings : -1
        }).limit(3);
        if(reviews){
            return res.json({
                message : "Reviews retrieved",
                data : reviews
            });
        }else {
            return res.json({
                message : "No reviews found"
            });
        }
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}

module.exports.getPlanReviews = async function getPlanReviews(req,res){
    try {
        let planId = req.params.id;
        let reviews = await reviewModels.find();
        reviews = reviews.filter(review => review.plan._id == planId);
            return res.json({
                message : "Reviews retrieved for a particular plan successfully",
                data : reviews 
            });
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}

module.exports.createReview = async function createReview(req,res){
    try {
        const id = req.params.plan;
        const plan = await planModels.findById(id);
        const review = await reviewModels.create(req.body);
        // plan.ratingsAverage = (plan.ratingsAverage + req.body.ratings)/2;
        await review.save();
        res.json({
            message : "review created",
            data : review
        })
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}

module.exports.updateReview = async function updateReview(req,res){
    try {
        const planId = req.params.id;
        //Review id from frontend
        let id = req.body.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for(let key in dataToBeUpdated){
            if(key == 'id') continue;
            keys.push(key);
        }
        const review = await reviewModels.findById(id);
        for(let i=0; i<keys.length; i++){
            review[keys[i]] = dataToBeUpdated[keys[i]];
        }
        await review.save();
        res.json({
            message : ' Review updated successfully',
            data : review
        })    
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

module.exports.deleteReview = async function deleteReview(req,res){
    try {
        let planId = req.params.id;
        //Review id from frontend
        let id = req.body.id;
        let review = await reviewModels.findByIdAndDelete(id);
        res.json({
            message : "Review deleted",
            data : review
        });
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}