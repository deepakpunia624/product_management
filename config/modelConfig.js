const mongoose = require("mongoose");

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
});
mongoose.connection.on("error", (req, err) => {
  console.log("mongoose connection error", err);
});
mongoose.connection.on("connected", (req, err) => {
  console.log("mongoose connected successfully");
});
