const createError = require("http-errors");
const User = require("../Models/User.model");
const {
  registerService,
  findUserByEmail,
} = require("../Services/Auth.service");

const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw createError.BadRequest();
    }
    const doesExist = await findUserByEmail(email);
    if (doesExist) {
      throw createError.Conflict(`${email} is already registered`);
    }
    registerService(name, email, password, res);
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  res.send("Login route");
};

const refreshTokenController = async (req, res, next) => {
  res.send("Refresh token route");
};

const logoutController = async (req, res, next) => {
  res.send("Logout router");
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
};
