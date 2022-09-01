const express = require('express');
const router = express.Router();
const {Opinions} = require('../models')
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
    //rozwiązuje problem niemożności usunięcia opinii tuż po dodaniu, bo zwracamy wiersz bezpośrednio z bazy danych
  })
})

router.delete('/:opinionId', validateToken, async (req, res)=>{
  const opinionId = req.params.opinionId;

  await Opinions.destroy({where: {id: opinionId}});

  res.json("opinion deleted");
})



module.exports = router;

