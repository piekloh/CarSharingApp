const express = require('express');
const router = express.Router();
const {Users} = require('../models')
const bcrypt = require("bcrypt");

router.post('/', async (req,res)=>{
  const {username, password} = req.body; //login i hasło osobno pobieramy
  bcrypt.hash(password, 10).then((hash)=>{
    Users.create({
      username: username,
      password: hash
    });
    res.json("user added");
  })
}); 

router.post('/login', async (req,res)=>{
  const {username, password} = req.body;

  const user = await Users.findOne({where: {username: username}})
  if(!user) return res.json({error: "User doens't exist"});

  bcrypt.compare(password, user.password).then((match)=>{
    if(!match) return res.json({error: "Wrong username and password combination"})
    else{
      res.json("you logged in")
    }
  })


}); 

module.exports = router;