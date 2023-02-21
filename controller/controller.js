const { userData, access_token, userAddress } = require("../model/model");
const md5 = require("md5");

exports.getId = async (req, res) => {
  const { username, password } = req.body;
  // const Id = req.body.user_id;
  try {
    const data = await userData.login(username, password);
    const token = md5(data._id);
    // const preToken = await userData.findOne({ _id: req.body.user_id });

    // if (preToken) return res.status(200).json({ ...preToken._doc });
    const access_tokens = await access_token({
      access_token: token,
      _id: req.body._id,
    }).save();
    return res
      .status(200)
      .json({ message: "user login successfully", access_token: userData._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  const Id = req.query._id;
  try {
    const user = await userData.findById(Id).exec();
    return res
      .status(200)
      .json({ message: "user data fetched successfully", user_details: user });
  } catch (error) {
    res.status(400).json({ message: "access token do not match to any user" });
  }
};

exports.allData = async (req, res) => {
 const  _id = req.body._id;
  try {
    const data = await userData
      .findOne({ _id:  _id})
      .populate({
        path: "address",
        select: "address city state pincode phoneno -_id",
      })
      .exec();
    console.log("address is", data);
    res
      .status(200)
      .json({ message: "data fetched successfully", user_data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//    {
//     if (!allDetail)
//         return next(CustomError.Error404("User not found: Internal Server Error"));
//     res.json(allDetail);
// }

exports.getAllUsers = async (req, res) => {
  const requestCount = req.query.count;
  try {
    const user = await userData.find().limit(requestCount);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const user = new userData(req.body);
    const savedData = await user.save();

    return res.status(200).json({
      message: "user registered successfully",
      user_id: savedData._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.address = async (req, res) => {
  const add = req.body;
  try {
    const address = await userAddress(add).save();
    return res.status(200).json({
      message: "address entered successfully",
      address: address,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  let Id = req.headers._id;
  try {
    const user = await userData.findByIdAndDelete(Id).exec();
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
