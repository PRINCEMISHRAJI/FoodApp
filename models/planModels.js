const mongoose = require('mongoose');
const db_link = 'mongodb+srv://admin:JeSCuF9YFVDpBGzZ@cluster0.mdimqbr.mongodb.net/';
mongoose.connect(db_link)
.then(function(db) {
    // console.log(db);
    console.log("planModel db connected");
}).catch(function(err){
    console.log(err);
});

const planSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        maxlength : [20, 'Plan name should not exceed more than 20 characters']
    },
    duration : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : [true, 'Set a price']
    },
    ratings : {
        type : Number,

    },
    discount : {
        type : Number,
        validate : [function(){
            return this.discount < this.price;
        }, 'Discount should not exceed Price']
    }
}); 

//model
const planModel = mongoose.model('planModel', planSchema);

// (async function createPlan(){
//     let planObj = {
//         name : 'SuperFood10',
//         duration : 35,
//         price : 800,
//         ratingsAverage : 5,
//         discount : 120
//     }
//     // let data =await planModel.create(planObj);
//     // console.log(data);
//     const doc = new planModel(planObj);
//     await doc.save()
// }) ();

module.exports = planModel;