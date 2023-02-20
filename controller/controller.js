const { userData, access_token } = require("../model/model");
const md5 = require("md5");

exports.getId = async (req, res) => {
  const { username, password } = req.body;
  const Id = req.body.user_id;
  try {
    const data = await userData.login(username, password);
    const token = md5(data._id);
    const access_tokens = await access_token({ access_token: token }).save();
    // console.log(access_tokens, "======>");
    // access_token
    //   .findOne({ _id: Id })
    //   .populate("user_Id")
    //   .exec(function (err, access_token) {
    //     if (err) return handleError(err);
    //     console.log(access_token, "---------->");
    //   });

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
  try {
    const data = await userData.find();
    res
      .status(200)
      .json({ message: "data fetched successfully", user_data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

exports.userAddress = async (req, res) => {
  try {
    const user = new access_token(req.body);
    const savedData = await user.save();

    return res.status(200).json({
      message: "address entered successfully",
      user_id: savedData._id,
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
