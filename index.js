require("dotenv").config();
const express = require("express");

require("./config/modelConfig");
const router = require("./routes/productRouter");

const app = express();

app.use(express.json());
app.use("/product", router);

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running on port no: ${process.env.PORT}`);
});
