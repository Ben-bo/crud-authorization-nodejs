const { register, login } = require("../controllers/auth");
const {
  verifyToken,
  authValidation,
  authAdmin,
} = require("../middlewares/authorization");

const route = require("express").Router();
route.post("/register", verifyToken, authAdmin, authValidation, register);
route.post("/login", login);
module.exports = route;
