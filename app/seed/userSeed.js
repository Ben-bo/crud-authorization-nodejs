const CryptoJS = require("crypto-js");
const { userModel } = require("../models");
const userSeed = async () => {
  const cekUser = await userModel.findOne({ username: "deni" }).exec();
  if (!cekUser) {
    const user = new userModel({
      username: "deni",
      password: CryptoJS.AES.encrypt("123456", process.env.SECRET_KEY),
      isAdmin: false,
      gender: "male",
      address: "Mataram",
      phone: "098736546372",
    });
    await user.save();
    console.log(`user seeding`);
  } else {
    console.log(`user exist, no seed runing.`);
  }
};
module.exports = userSeed;
