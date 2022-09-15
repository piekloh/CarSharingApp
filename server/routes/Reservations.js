const express = require('express');
const router = express.Router();
const {Reservations} = require('../models')
const {validateToken} = require('../middleware/AuthMiddleware');
const { Op } = require("sequelize");


router.post('/', validateToken, async (req, res) =>{
  const reservation = req.body;
  console.log(reservation)
  reservation.UserId = req.user.id;

  const reserStartFormatted = new Date(reservation.start).getTime();
  const reserStopFormatted = new Date(reservation.stop).getTime();

  const collision = await Reservations.findAll({
    where: {
    [Op.or]: [
      {[Op.and]:[{start: {[Op.between]: [reserStartFormatted, reserStopFormatted]}}, {CarId: req.body.CarId}]},
      {[Op.and]:[{stop: {[Op.between]: [reserStartFormatted, reserStopFormatted]}}, {CarId: req.body.CarId}]}
    ]
  }})

  if(collision.length===0){
    //no collisions
    await Reservations.create(reservation).then((reser)=>{
      res.json(reser);
  })}
  else{
    res.send("We wskazanym terminie samochód jest już zajęty. Wybierz inny termin.")
  }
})

router.get('/:carId', async (req,res)=>{
  const carId = req.params.carId;
  const reservations = await Reservations.findAll({where: {CarId: carId}});
  res.json(reservations);
})

module.exports = router;

