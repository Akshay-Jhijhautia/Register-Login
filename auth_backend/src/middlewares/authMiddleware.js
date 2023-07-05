const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/errors/app-error");
const { ErrorResponse } = require("../utils/common");
const { UserService } = require("../services");

function authMiddleware(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message =
      "Something went wrong while authenticating the user";
    ErrorResponse.error = new AppError(
      ["Name not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.email) {
    ErrorResponse.message =
      "Something went wrong while authenticating the user";
    ErrorResponse.error = new AppError(
      ["Email not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message =
      "Something went wrong while authenticating the user";
    ErrorResponse.error = new AppError(
      ["Password not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function signInMiddleware(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message =
      "Something went wrong while authenticating the user";
    ErrorResponse.error = new AppError(
      ["Email not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message =
      "Something went wrong while authenticating the user";
    ErrorResponse.error = new AppError(
      ["Password not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (response) {
      req.user = response;
      next();
    }
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
}

module.exports = {
  authMiddleware,
  signInMiddleware,
  checkAuth,
};
