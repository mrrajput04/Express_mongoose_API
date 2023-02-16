const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
       type: String,
       required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    confirm_password:{
      type:String,
      required:true
    },
    email_id:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    }
});

module.exports = mongoose.model("UserSchema",userSchema);