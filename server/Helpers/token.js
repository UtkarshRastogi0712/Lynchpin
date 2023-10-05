const JWT = require("jsonwebtoken");
const createError = require("http-errors");

const signAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
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

module.exports = {
  signAccessToken,
};
