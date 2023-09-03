// This is your test secret API key.
const SK = "sk_test_51NldM5SHRgrhrH6WB0ANAWOiwjZiz7QblsijIH8BqFuazA2COVD8VRnRq97AcnCIhosz4Kii1ytRAcCB7udezQlX001RozplIJ";
const stripe = require('stripe')(SK);
const planModels = require('../models/planModels');
const userModels = require("../models/userModels")
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:4242';
module.exports.createSession = async function createSession(req,res){
    try {
        const planId = req.params.id;
        const userId = req.id;

        const user = await userModels.findById(userId);
        const plan = await planModels.findById(planId);

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            customer_email : user.email,
            customer_reference_id : plan.id,
            line_items: [
                {
                name : plan.name,
                description : plan.description,
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                amount : plan.price,
                currency : "INR",
                quantity: 1
                },
            ],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get("host")}/profile`,
            cancel_url: `${req.protocol}://${req.get("host")}/profile`,
        });
    
        res.status(200).json({
            status : "success",
            session
        })
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

// app.listen(4242, () => console.log('Running on port 4242'));