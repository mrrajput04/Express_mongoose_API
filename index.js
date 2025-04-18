const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/route");
const { DBURL, PORT } = require("./config/index");
mongoose.set('strictQuery', true);
const passport = require('passport')

mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(express.json());

app.use("/user", routes);
app.use(passport.initialize());
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
