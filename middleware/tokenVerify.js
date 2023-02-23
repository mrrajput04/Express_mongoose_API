var jwt = require("jsonwebtoken");
const key = require("../config");
const CustomError = require("../error/CustomError");

const tokenVerify = async (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header)
    return next(CustomError.unauthorized("unauthorized access denied"));
  const token = header.split(" ")[1];
  try {
    if (token) {
      const decode = jwt.verify(token, key.secretKey);

      // res.json({
      //   login: true,
      //   data: decode,
      // });
      res.token = decode; 
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = tokenVerify;
