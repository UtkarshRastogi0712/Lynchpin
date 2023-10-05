const createError = require("http-errors");
const User = require("../Models/User.model");

const registerService = async (name, email, password, callback) => {
  try {
    const user = new User({ name, email, password });
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const findUserByEmail = async (userEmail) => {
  try {
    return await User.findOne({ email: userEmail });
  } catch (err) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  registerService,
  findUserByEmail,
};
