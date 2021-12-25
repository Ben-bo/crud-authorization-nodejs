const { userModel } = require("../models");

const userController = {
  getProfile: async (req, res) => {
    try {
      const idUser = req.body.decodedToken.id;
      const user = await userModel.findById(idUser).exec();
      res.status(200).send({
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const user = await userModel.find({});
      res.status(200).send({
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { username, password, isAdmin, gender, address, phone } = req.body;
      const data = {
        username,
        password,
        isAdmin,
        gender,
        address,
        phone,
      };
      const data = await userModel.findByIdAndUpdate(id, data);
      if (data) {
        res.send({
          Message: "success",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
module.exports = userController;
