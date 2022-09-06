const express = require('express');
const router = express.Router();
const {Reservations} = require('../models')
const {validateToken} = require('../middleware/AuthMiddleware');
// const moment = require('moment')
const { Op } = require("sequelize");

router.post('/', validateToken, async (req, res) =>{
  const reservation = req.body;
  reservation.UserId = req.user.id;

  const reserStartFormatted = new Date(reservation.start).getTime();
  const reserStopFormatted = new Date(reservation.stop).getTime();

  const collision = await Reservations.findAll({
    where: {
    [Op.or]: [
      {start: {[Op.between]: [reserStartFormatted, reserStopFormatted]}},
      {stop: {[Op.between]: [reserStartFormatted, reserStopFormatted]}}
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

module.exports = router;

