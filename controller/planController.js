const planModel = require('../models/planModels');

module.exports.getAllPlans = async function getAllPlans(req,res){
    try{
        let plans = await planModel.find();
        if(plans){
            return res.json({
                message: "All Plans retrieved",
                data : plans
            })
        }else{
            return res.json({
                message : "No Plan is found"
            })
        }
    } catch(error){
        return res.status(500).json({
            message : error.message
        });
    }
}

module.exports.getPlan = async function getPlan(req,res){
    try{
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if(plan){
            return res.json({
                message: "Plan retrieved",
                data : plan
            })
        }else{
            return res.json({
                message : "No Plan is found"
            })
        }
    } catch(error){
        return res.status(500).json({
            message : error.message
        });
    }
}

module.exports.createPlan = async function (req,res){
    try{
        let planData = req.body;
        console.log(planData);
        let createdPlan = await planModel.create(planData);
        return res.json({
            message : ' Plan created successfully',
            data : createdPlan
        })
    }catch(error){
        return res.staus(500).json({
            message : error.message
        })
    }
}

module.exports.deletePlan = async function (req,res){
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        return res.json({
            message : "Plan deleted successfully",
            data : deletedPlan
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

module.exports.updatePlan = async function (req,res){
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        for(let i=0; i<keys.length; i++){
            plan[keys[i]] = dataToBeUpdated[keys[i]];
        }
        await plan.save();
        res.json({
            message : ' Plan updated successfully',
            data : plan
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

module.exports.getTop3Plans = async function getTop3Plans(req,res){
    try {
        let plans = await planModel.find().sort({
            ratingsAverage : -1
        }).limit(3);
        return res.json({
            message : "Top 3 Plans",
            data : plans
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}