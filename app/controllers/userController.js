const { userModel } = require("../models");

const userController = {
  getProfile: async (req, res) => {
    try {
      const idUser = req.body.decodedToken._id;
      console.log(idUser);
      const user = await userModel.findById(idUser).exec();
      if (!user) {
        res.status(404).send({
          message: "user not found",
        });
      } else {
        const { password, ...other } = user._doc;
        res.status(200).send({
          user: other,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const user = await userModel.find({}, { password: 0 });
      if (user) {
        res.status(200).send({
          user,
        });
      } else {
        res.status(404).send({
          message: "no user",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { username, isAdmin, gender, address, phone } = req.body;
      const data = {
        username,
        isAdmin,
        gender,
        address,
        phone,
      };
      const update = await userModel.findByIdAndUpdate(id, data);
      if (update) {
        res.send({
          Message: "success",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await userModel.findByIdAndDelete(id);
      if (user) {
        res.send({
          Message: "success",
        });
      } else {
        res.status(404).send({
          message: "no user",
        });
      }
    } catch (error) {}
  },
};
module.exports = userController;
