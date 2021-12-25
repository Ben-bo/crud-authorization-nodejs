const mongoose = require("mongoose");
mongoose
  .connect(process.env.CLUSTER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("cant connect database:", err);
    process.exit(); //hentikan programm
  });
