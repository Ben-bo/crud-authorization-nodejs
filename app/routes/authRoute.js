const { register, login } = require("../controllers/auth");
const {
  getProfile,
  getAll,
  update,
  deleteUser,
} = require("../controllers/userController");
const {
  verifyToken,
  authValidation,
  authAdmin,
} = require("../middlewares/authorization");

const route = require("express").Router();
route.post("/register", verifyToken, authAdmin, authValidation, register);
route.post("/login", login);
route.get("/profile", verifyToken, getProfile);
route.get("/users", verifyToken, authAdmin, getAll);
route.get("/update/:id", verifyToken, authAdmin, update);
route.delete("/delete/:id", verifyToken, authAdmin, deleteUser);
module.exports = route;
