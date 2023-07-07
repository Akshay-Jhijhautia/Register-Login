const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const userDataRoutes = require("./userDataRoutes");

router.use("/user", userRoutes);
router.use("/userData", userDataRoutes);

module.exports = router;
