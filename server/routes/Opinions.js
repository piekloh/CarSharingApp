const express = require('express');
const router = express.Router();
const {Opinions} = require('../models')

router.get('/:carId', async (req,res)=>{
  const carId = req.params.carId;
  const opinions = await Opinions.findAll({where: {CarId: carId}});
  res.json(opinions);
})

router.post('/', async (req, res) =>{
  const opinion = req.body;
  await Opinions.create(opinion);
  res.json(opinion);
})



module.exports = router;
