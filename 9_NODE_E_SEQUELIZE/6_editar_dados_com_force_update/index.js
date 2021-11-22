const { log } = require("console");
const express = require("express");
const conn = require("./db/conn");

const User = require("./models/User");

const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.get("/add", (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

app.post("/save-user", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;
  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }
  await User.create({ name, occupation, newsletter });

  res.redirect("/");
});

app.get("/users", async (req, res) => {
  const users = await User.findAll({ raw: true });

  console.log(users);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ raw: true, where: { id: id } });

  console.log(user);
});

app.get("/edit", (req, res) => {
  res.sendFile(`${basePath}/updateform.html`);
});

app.post("/edit", async (req, res) => {
  const id = req.body.id;

  const user = await User.findOne({ raw: true, where: { id: id } });

  if (user != null) {
    let name = req.body.name;
    let occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    name = name == "" ? user.name : name;
    occupation = occupation == "" ? user.occupation : occupation;
    newsletter = newsletter === "on" ? true : false;

    const userData = {
      id,
      name,
      occupation,
      newsletter,
    };

    await User.update(userData, { where: { id: id } });
    res.redirect("/");
  } else {
    console.log("Usuario não encontrado!");
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;

  await User.destroy({ where: { id: id } });

  res.redirect("/");
});

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

conn
  //.sync()
  .sync({ force: true }) // apaga os dados do db
  .then(() => {
    app.listen(port);
  })
  .catch((error) => console.log(error));
