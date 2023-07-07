const express = require("express");
const router = express.Router();

const { UserDataController } = require("../controller");

router.get("/", UserDataController.getAllUserData);
router.post("/data", UserDataController.createUserData);
router.get("/:id", UserDataController.getASingleUserData);

module.exports = router;
