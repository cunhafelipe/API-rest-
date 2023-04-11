const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    minlength: 7,
  },
  admin: {
    type: Boolean,
  },
});

const Users = mongoose.model("User", UserModel);

module.exports = Users;
