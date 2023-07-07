const { StatusCodes } = require("http-status-codes");

const { UserService, UserDataService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function getAllUsers(req, res) {
  try {
    const user = await UserService.getAllData();
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getASingleUserData(req, res) {
  try {
    const user = await UserService.getSingleUser(req.params.id);
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateDetails(req, res) {
  try {
    const userData = await UserService.getSingleUser(req.user);
    await UserDataService.createUserData({
      user_details: {
        name: userData.name,
        email: userData.email,
        fieldsUpdated: {
          name: req.body.name === undefined ? "NO" : "YES",
          address: req.body.address === undefined ? "NO" : "YES",
          phoneNumber: req.body.phoneNumber === undefined ? "NO" : "YES",
          gender: req.body.gender === undefined ? "NO" : "YES",
          city: req.body.city === undefined ? "NO" : "YES",
          pincode: req.body.pincode === undefined ? "NO" : "YES",
        },
      },
    });
    const user = await UserService.updateName(req.params.id, {
      name: req.body.name,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      city: req.body.city,
      pincode: req.body.pincode,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await UserService.deleteUser(req.query.id);
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signUp(req, res) {
  try {
    const user = await UserService.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signIn(req, res) {
  try {
    const user = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  signUp,
  signIn,
  getAllUsers,
  updateDetails,
  deleteUser,
  getASingleUserData,
};
