const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");

//REGISTRATION
router.post("/", async (req, res) => {
  const { username, password } = req.body; //login i hasło osobno pobieramy
  const user = await Users.findOne({ where: { username: username } });

  if (user) res.json({error: "A user with this username already exists"});
  else {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json("user added");
    });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "Użytkownik o podanej nazwie nie istnieje" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match)
      return res.json({ error: "Nieprawidłowa nazwa użytkownika lub hasło" });
    else {
      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantSecret"
      ); //to jest ciąg znaków, nie obiekt
      return res.json({ token: accessToken, username: username, id: user.id });
    }
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user); //to jest obiekt zawierający username, id itd.
});

module.exports = router;
