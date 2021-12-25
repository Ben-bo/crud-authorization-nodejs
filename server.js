const express = require("express");
const seedAdmin = require("./app/seed/seedAdmin");
const userSeed = require("./app/seed/userSeed");

const app = express();
require("dotenv").config();
require("./config");
seedAdmin();
userSeed();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { authRoute } = require("./app/routes");
app.use("/api", authRoute);
app.listen(5000, () => {
  console.log(`server is running`);
});
