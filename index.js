// require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
// const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const app = express();
const PORT = "8080";

app.use(
  body_parser.json(),
  // productRoutes,
  userRoute,

  cors(),
  helmet(),
  compression()
);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/eshop-alex", {
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);

app.get("/", (req, res) => {
  res.json("Welcome On API eshop-alex");
});

app.listen(process.env.PORT || PORT, () => {
  console.log("server listening on port " + PORT);
});
