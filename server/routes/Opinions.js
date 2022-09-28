const express = require('express');
const router = express.Router();
const {Opinions} = require('../models')
const { Users } = require("../models");
const {validateToken} = require('../middleware/AuthMiddleware');

router.get('/:carId', async (req,res)=>{
  const carId = req.params.carId;
  const opinions = await Opinions.findAll({where: {CarId: carId}});
  res.json(opinions);
})

router.post('/', validateToken, async (req, res) =>{
  const opinion = req.body;
  const username = req.user.username;
  opinion.username = username;
  await Opinions.create(opinion).then((op)=>{
    res.json(op);
    //solve problem of not being able to delete opinion just after adding, we're returning a DB record directly
  })
})

router.delete('/:opinionId', validateToken, async (req, res)=>{
  const opinionId = req.params.opinionId;

  await Opinions.destroy({where: {id: opinionId}});

  res.json("opinion deleted");
})

router.get('/byuser/:userId', async (req,res)=>{
  const userId = req.params.userId;
  const opinions = await Opinions.findAll({where: {UserId: userId}});
  res.json(opinions);
})



module.exports = router;

