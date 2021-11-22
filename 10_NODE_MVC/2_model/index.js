const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const port = 3000;

const conn = require("./db/conn");

const Task = require("./models/Task");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

conn
  .sync()
  .then(() => app.listen(port))
  .catch((err) => console.log(err));
