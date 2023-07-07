const { StatusCodes } = require("http-status-codes");

const { UserDataService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function getAllUserData(req, res) {
  try {
    const response = await UserDataService.getAllData();
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function createUserData(req, res) {
  try {
    const response = await UserDataService.createUserData({
      user_details: req.body.user_details,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { getAllUserData, createUserData };
