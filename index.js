const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes/route')

mongoose.connect("mongodb://127.0.0.1:27017/users");
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

 
const port = 4500;
const app = express();
app.use(express.json());

app.use("/user", routes);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});