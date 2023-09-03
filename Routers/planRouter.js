const express = require("express");
const planRouter = express.Router();
const {protectRoute, isAuthorized} = require('../controller/authController');
const {getAllPlans, getPlan, createPlan, updatePlan, deletePlan} = require('../controller/planController')


// TO get all the plans
planRouter
.route('/allPlans')
.get(getAllPlans)

// will check if user has logged in and then show the specific plan with id
planRouter.use(protectRoute);
planRouter
.route('/plan/:id')
.get(getPlan)

// Will provide create, update and delete plan facility to admin and restaurant owners
planRouter.use(isAuthorized(['admin', 'restaurantOwner']));
planRouter
.route('/crudPlan')
.post(createPlan)

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

module.exports = planRouter;