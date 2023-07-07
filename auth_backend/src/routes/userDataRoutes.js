const express = require("express");
const router = express.Router();

const { UserDataController } = require("../controller");

router.get("/userData", UserDataController.getAllUserData);
router.post("/data", UserDataController.createUserData);

module.exports = router;
