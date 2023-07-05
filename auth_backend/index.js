const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./src/routes/userRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Healthy");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});
