const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function checkPassword(plainPassword, encryptedPassword) {
  return bcrypt.compareSync(plainPassword, encryptedPassword);
}

function createToken(input) {
  return jwt.sign(input, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = {
  checkPassword,
  createToken,
  verifyToken,
};
