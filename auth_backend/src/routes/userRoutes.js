const express = require("express");
const router = express.Router();

const { UserController } = require("../controller");
const { AuthMiddleware } = require("../middlewares");

router.post("/signup", AuthMiddleware.authMiddleware, UserController.signUp);
router.post("/login", AuthMiddleware.signInMiddleware, UserController.signIn);
router.get("/users", UserController.getAllUsers);
router.get("/data/:id", UserController.getASingleUserData);
router.patch(
  "/update/:id",
  AuthMiddleware.checkAuth,
  UserController.updateDetails
);
router.delete("/delete", UserController.deleteUser);

module.exports = router;
