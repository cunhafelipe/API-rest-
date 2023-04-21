const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 7,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "mestre"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserModel.plugin(uniqueValidator);

const User = mongoose.model("User", UserModel);

module.exports = User;
