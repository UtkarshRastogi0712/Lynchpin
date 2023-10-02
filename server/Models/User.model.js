const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    require: [true, "Please provide a name"],
  },
  email: {
    type: String,
    require: [true, "Please provide a email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
    minlength: 6,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
