const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const MaRoutes = require("./route/MaRoutes");
const cors = require("cors");
const app = express();

app.use(body_parser.json(), MaRoutes, cors());
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/MyDataBase", {
  useNewUrlParser: true
});

app.get("/", (req, res) => {
  res.json("welcome sur la Mon API");
});

app.listen(process.env.PORT || 5500, () => {
  console.log("server listening");
});
