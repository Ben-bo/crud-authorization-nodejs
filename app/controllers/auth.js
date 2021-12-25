const { userModel } = require("../models");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const auth = {
  register: async (req, res) => {
    try {
      let message = "SUCCESS";
      let status = 200;
      let result = {};
      const cekMail = await userModel.findOne({ email: req.body.email }).exec();
      if (cekMail) {
        message = "email alreday exist";
        status = 500;
      } else {
        const newUser = new userModel({
          username: req.body.username,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
          ).toString(),
          isAdmin: req.body.isAdmin,
        });
        result = await newUser.save();
      }
      res.status(201).json({
        status,
        message,
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      let status = 200;
      let message = "SUCCESS";
      let tokenUser = null;
      let data = {};
      const findUser = await userModel.findOne({
        username: req.body.username,
      });
      if (findUser) {
        const decryptPass = CryptoJS.AES.decrypt(
          findUser.password,
          process.env.SECRET_KEY
        );
        const pass = decryptPass.toString(CryptoJS.enc.Utf8);
        if (pass === req.body.password) {
          const { password, ...other } = findUser._doc;
          const token = jwt.sign(other, process.env.SECRET_KEY, {
            expiresIn: "3d",
          });
          tokenUser = token;
          data = other;
        } else {
          message = "Wrong password";
          status = 500;
        }
      } else {
        message = "Wrong username";
        status = 500;
      }

      res.status(status).json({
        Message: message,
        ...data,
        Token: tokenUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
module.exports = auth;
