const { log } = require("console");
const express = require("express");
const conn = require("./db/conn");

const User = require("./models/User");
const Address = require("./models/Address");

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
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  const newUser = await User.create({ name, occupation, newsletter });
  const UserId = newUser["id"];
  const address = {
    UserId,
    street,
    number,
    city,
  };

  await Address.create(address);

  res.redirect("/");
});

app.get("/users", async (req, res) => {
  const users = await User.findAll({ raw: true });
  // console.log(users);
  let usuarios = [];
  let address;
  for (let index = 0; index < users.length; index++) {
    address = await Address.findOne({
      raw: true,
      where: { id: users[index]["id"] },
    });
    const usuario = {};
    usuarios.push([users[index], address]);
  }
  console.log(usuarios);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ include: Address, where: { id: id } });
  // if (user != null) {
  //   const address = await Address.findOne({
  //     raw: true,
  //     where: { UserId: user["id"] },
  //   });
  //   console.log(address);
  // }
    console.log(user.get({plain: true}));
});

app.get("/edit", (req, res) => {
  res.sendFile(`${basePath}/updateform.html`);
});

app.post("/edit", async (req, res) => {
  const id = req.body.id;

  if(id != undefined) {

    const user = await User.findOne({ raw: true, where: { id: id } });
  
    if (user != null) {

      const address = await Address.findOne({
        raw: true,
        where: { UserId: user.id },
      });
  
      if (address != null) {
        let name = req.body.name;
        let occupation = req.body.occupation;
        let newsletter = req.body.newsletter;
  
        name = name == ""  ? user.name : name;
        occupation = occupation == "" ? user.occupation : occupation;
        newsletter = newsletter === "on" ? true : false;
  
        const userData = {
          name,
          occupation,
          newsletter,
        };
  
        let street = req.body.street;
        let number = req.body.number;
        let city = req.body.city;
  
        street = street == "" ? address.street : street;
        number = number == "" ? address.number : number;
        city = city == "" ? address.city : city;
  
        const UserId = user.id
  
        const addressData = {
          UserId,
          street,
          number,
          city
        }
  
        await User.update(userData, { where: { id: id } });
  
        await Address.update(addressData, { where: { id: address.id } });
        res.redirect("/");
      } else {
        console.log("Endereço não encontrado!");
      }
    } else {
      console.log("Usuario não encontrado!");
    }
  }

});

app.post("/delete", async (req, res) => {
  const id = req.body.id;

  await Address.destroy({where: {UserId: id}})
  await User.destroy({ where: { id: id } });

  res.redirect("/");
});

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

conn
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(port);
  })
  .catch((error) => console.log(error));
