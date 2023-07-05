const { StatusCodes } = require("http-status-codes");

const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Auth } = require("../utils/common");

const userRepository = new UserRepository();

async function getSingleUser(id) {
  try {
    const user = await userRepository.get(id);
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Cannot Get the data of the user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllData() {
  try {
    const user = await userRepository.getAll();
    return user;
  } catch (error) {
    throw new AppError("Cannot get the Data of the users");
  }
}

async function updateName(id, data) {
  try {
    const user = await userRepository.update(id, data);
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Cannot Update Name of the user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteUser(id) {
  try {
    const user = await userRepository.destroy(id);
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Cannot Delete the user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function create(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    if (error.errors[0].message == "Validation isEmail on email failed") {
      throw new AppError(
        "Please enter Email in proper format",
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError(
      "Cannot create a User",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(
        "No user found for the given email",
        StatusCodes.NOT_FOUND
      );
    }
    const checkPassword = Auth.checkPassword(data.password, user.password);
    if (!checkPassword) {
      throw new AppError("Password does not match", StatusCodes.BAD_REQUEST);
    }
    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went Wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("Missing JWT Token", StatusCodes.BAD_REQUEST);
    }
    const response = Auth.verifyToken(token);
    const user = await userRepository.get(response.id);
    if (!user) {
      throw new AppError("No user found", StatusCodes.NOT_FOUND);
    }
    return user.id;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name == "JsonWebTokenError") {
      throw new AppError("Invalid Json Token", StatusCodes.BAD_REQUEST);
    }
    if (error.name == "TokenExpiredError") {
      throw new AppError("Token is expired", StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Something Went Wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  create,
  signin,
  getAllData,
  isAuthenticated,
  updateName,
  deleteUser,
  getSingleUser,
};
