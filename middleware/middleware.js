const userData = require("../model/model");

const userValidator = async (req, res, next) => {
  //first check if email is valid return next()
  //check if user exists if true return next() ask to login
  //username, password , confirm password
  //we will save user to db and send the response -> id

  const errors = [];

  const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!emailRegexp.test(req.body.email_id)) {
    const error = {
      field: "Email",
      message: "Not a valid email",
    };
    errors.push(error);
  }

  if (req.body.password !== req.body.confirm_password) {
    const error = {
      field: "password",
      message: "password doesn't match",
    };
    errors.push(error);
  }
  if (errors.length > 0)
    return res.status(500).json({ Error: "Please check below fields", errors });

  const existEmail = await userData.userData.findOne({
    email_id: req.body.email_id,
  });
  if (existEmail) {
    const error = {
      field: "Email",
      message: "email is already exists",
    };
    errors.push(error);
    return next("email is already exists");
  }

  const existUsername = await userData.userData.findOne({
    username: req.body.username,
  });
  if (existUsername) {
    const error = {
      field: "Username",
      message: "username taken",
    };
    return next("username is already exists use a different username");
  }

  next();
};

module.exports = userValidator;
