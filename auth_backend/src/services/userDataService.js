const { StatusCodes } = require("http-status-codes");

const { UserDataRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const userDataRepository = new UserDataRepository();

async function getAllData() {
  try {
    const response = await userDataRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot get the data of the user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getSingleData(id) {
  try {
    const response = await userDataRepository.get(id);
    return response;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Cannot Get the data of the user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createUserData(data) {
  try {
    const response = await userDataRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot Update the data of the user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { getAllData, createUserData, getSingleData };
