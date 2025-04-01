const access_token = require("../model/model");

const validateToken = async (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header)
    return next(CustomError.unauthorized("unauthorized access denied"));
  const tokens = header.split(" ")[1];
  const existToken = await access_token.access_token.findOne({
    access_token: tokens,
  });
  if (existToken) {
    next();
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided.",
    });
  }
};

module.exports = validateToken;
