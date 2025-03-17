const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let salt = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  
  email_id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
});

//password encryption using bcrypt

userSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(salt, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (userPassword, callback) {
  bcrypt.compare(userPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("UserSchema", userSchema);
