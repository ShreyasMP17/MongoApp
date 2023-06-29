const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rating:{
        type:Number
    },
    description:{
        type:String
    },
    trailer:{
        type:String
    }
})

//exporting along with the model
module.exports = mongoose.model("Movie",movieSchema)  //movie is the name of the model name