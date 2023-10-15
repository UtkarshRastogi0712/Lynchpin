const createError = require("http-errors");
const Joi = require("@hapi/joi");
const { authSchema, loginSchema } = require("../Helpers/req.validators");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../Helpers/token");
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
    const savedUser = await registerService(
      result.name,
      result.email,
      result.password
    );
    const accessToken = await signAccessToken(savedUser);
    const refreshToken = await signRefreshToken(savedUser);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);
    const user = await findUserByEmail(result.email);
    if (!user) {
      throw createError.NotFound("User not found");
    }
    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) {
      throw createError.Unauthorized("Email or password not valid");
    }
    const accessToken = await signAccessToken(user);
    res.send(accessToken);
  } catch (error) {
    console.error(error);
    if (error.isJoi === true) {
      return next(
        createError.BadRequest("Invalid username, email or password")
      );
    }
    next(error);
  }
};

const refreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError.BadRequest();
    }
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({ accessToken: accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
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
