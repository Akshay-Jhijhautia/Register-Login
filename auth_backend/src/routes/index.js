const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const userDataRoutes = require("./userDataRoutes");

router.use("/", userRoutes);
router.use("/", userDataRoutes);

module.exports = router;
