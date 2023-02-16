
const userSchema = require('../model/model')
const userValidator = async(req, res) =>{
    
    const existUsername = await userSchema.findOne({ username: req.body.username});
    if (existUsername) {
      console.log('username taken');
      res.status(400).json({
        message:'username taken'
      })
    }else {
        console.log('user register')
        const user = new userSchema(req.body);
        const savedData  = await user.save();
        
        return res.status(200).json({
            message: "user added successfully",
            savedData:savedData._id,
        });
          }

       const existEmail = await userSchema.findOne({email_id:req.body.email_id});
       if(existEmail){
        console.log('email is already exists');
        res.status(400).json({
            message:'email is already exists'
        })
       } else{
        console.log('user register')
        const user = new userSchema(req.body);
        const savedData  = await user.save();
        
        return res.status(200).json({
            message: "user added successfully",
            savedData:savedData._id,
        });
       }
  

}


module.exports = userValidator;