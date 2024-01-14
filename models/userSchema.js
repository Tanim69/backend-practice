const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema =new Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:{
        type:String,
        required:true
    },
    token:String,
})

module.exports=mongoose.model('Userlist',userSchema)