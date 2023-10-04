const createError = require("http-errors");
const Joi = require("@hapi/joi");
const authSchema = require("../Helpers/req.validators").authSchema;
const {
  registerService,
  findUserByEmail,
} = require("../Services/Auth.service");

const registerController = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const doesExist = await findUserByEmail(result.email);
    if (doesExist) {
      throw createError.Conflict(`${result.email} is already registered`);
    }
    registerService(result.name, result.email, result.password, res);
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
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
