const userSchema = require('../model/model');

exports.addUser = async(req, res)=>{
    try{
        const user = new userSchema(req.body);
        const savedData  = await user.save();
        
        return res.status(200).json({
            message: "user added successfully",
            user_id:savedData._id,
        });
    } catch(error){
        res.status(400).json({message:error.message});
    }
};




