const { userData, userAddress } = require("../model/model");
const key = require("../config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const salt = 10;

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await userData.login(username, password);
    const access_token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        _id:data._id,
      },
      key.secretKey
    );

    return res.status(200).json({
      message: "user login successfully",
      access_token: access_token,
      user_id: data._id,
    });
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
  const _id = req.body._id;
  try {
    const data = await userData
      .findOne({ _id: _id })
      .populate({
        path: "address",
        select: "address city state pincode phoneno -_id",
      })
      .exec();
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

exports.address = async (req, res) => {
  const token = req.token;
  const add = req.body;
  try {
    const addr = await userAddress(add).save();
    const data = await userData.findOne({ _id: token.payload });
    data.address.push(addr);
    await data.save();
    return res.status(200).json({ message: "address added successfully" });
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

exports.deleteAddress = async (req, res) => {
  // Id = req.body.address;
  const checkedItemId = mongoose.Types.ObjectId(req.body.address);
  console.log(checkedItemId, "=======>");

  const data = await userData.update(
    { _id: checkedItemId },
    { " $pull": { "address.0": "" } }
  );
  console.log(data, "======");

  try {
    // for (let id of Id) {
    // console.log(id, ">>>>>>>>-------");
    // const user = await userData.findByIdAndDelete(data).exec()
    // console.log(user,'====<<<');
    return res
      .status(200)
      .json({ message: "user address deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.forgetPassword = async (req, res) => {
  let email = req.body.email_id;
  try {
    const findUser = await userData.findOne({ email_id: email });
    const access_token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 15 * 60,
        payload: findUser._id,
      },
      key.secretKey
    );

    res.status(200).json({
      message: "access token generated successfully",
      access_token: access_token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const Id = req.token;
  const add = req.body.password;
  try {
    const hashedPassword = await bcrypt.hash(add, salt);
      await userData.findByIdAndUpdate(
      Id._id,
      { password: hashedPassword },
      { new: true }
    );
   await Token.deleteMany(Id.payload);
    res.status(200).json({
      message: "password updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.userList = async(req,res)=>{
  try{
    const list = await userData.find({_id:req.user._id});
    res.status(200).json({message:"successful",list:list});
  } catch (error){
    res.status(400).json({error:error})
  }
}