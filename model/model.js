const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

let salt = 10;

const userSchema = new Schema({
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
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  address: [{ type: Schema.Types.ObjectId, ref: "Address" }]
});

const tokenSchema = new Schema({
  _id: {
    type:String
  },
  access_token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "60s" },
  },
});

const address = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "UserSchema" },
  address:String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    min: 5,
    required: true,
  },
  phoneno: {
    type: Number,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    required:true
  }
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

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const userData = mongoose.model("UserSchema", userSchema);
const access_token = mongoose.model("access_token", tokenSchema);
const userAddress = mongoose.model("address", address);
module.exports = { userData, access_token, userAddress };
