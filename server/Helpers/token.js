const JWT = require("jsonwebtoken");
const createError = require("http-errors");

const signAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "1h",
      issuer: "localhost:3000",
      audience: user._id.toString(),
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.error(err);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) return next(createError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return next(createError.Unauthorized());
    }
    req.payload = payload;
    next();
  });
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
};
