const userSchema = require("../model/model");

exports.getId = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username,password,"============>")
  try {
    const user = await userSchema.findOne({ username, password }).exec();
    console.log(user,"=======>")
    return res
      .status(200)
      .json({ message: "user login successfully", access_token: user});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  const Id = req.query._id;
  try {
    const user = await userSchema.findById(Id).exec();
    return res
      .status(200)
      .json({ message: "user data fetched successfully", user_details: user });
  } catch (error) {
    res.status(400).json({ message: 'access token do not match to any user  ' });
  }
};

exports.getAllUsers = async (req, res) => {
    const requestCount = req.query.count
  try {
    const user = await userSchema.find().limit(requestCount)
    res.status(200).json({user:user})
}

     catch (error) {
            res.status(400).json({ message: error.message });
          }
 
    
//     return res
//       .status(200)
//       .json({ message: "data fetched successfully", user_data: user });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
};

exports.addUser = async (req, res) => {
  try {
    const user = new userSchema(req.body);
    const savedData = await user.save();

    return res.status(200).json({
      message: "user registered successfully",
      user_id: savedData._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  let Id = req.headers._id;
  try {
    const user = await userSchema.findByIdAndDelete(Id).exec();
    return res.status(200).json({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
