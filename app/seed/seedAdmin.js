const CryptoJS = require("crypto-js");
const { userModel } = require("../models");
const seedAdmin = async () => {
  const cekUser = await userModel.findOne({ username: "beni" }).exec();
  if (!cekUser) {
    const admin = new userModel({
      username: "beni",
      password: CryptoJS.AES.encrypt("123456", process.env.SECRET_KEY),
      isAdmin: true,
      gender: "male",
      address: "Mataram",
      phone: "098736546372",
    });
    await admin.save();
    console.log(`admin seeding`);
  } else {
    console.log(`admin exist, no seed runing.`);
  }
};
module.exports = seedAdmin;
