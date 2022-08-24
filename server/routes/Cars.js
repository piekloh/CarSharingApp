const express = require('express');
const router = express.Router();
const {Cars} = require('../models')

////////////////////image to db///////////////////
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, './../client/public/Images')
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {fileSize: '5000000'}, //5 mb(5 000 000 bajtów)
  fileFilter: (req, file, cb) =>{
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype) //sprawdza, czy dobry format
    const extname = fileTypes.test(path.extname(file.originalname))

    if(mimeType && extname){
      return cb(null, true)
    }
    cb('Give proper files formate to upload')
  }
}).single('image') //ten sam "image" co w models/Cars.js(kolumna w BD)
//single, czyli, że będziemy dodawać tylko 1 obrazek


module.exports={
  upload
}
////////////////////image to db////////////////////


router.get('/', async (req, res)=>{
  const listOfCars = await Cars.findAll();
  res.json(listOfCars);
});

router.get('/byId/:id', async (req,res)=>{
  const id = req.params.id;
  const car = await Cars.findByPk(id);
  res.json(car);
})

router.post('/', upload, async (req,res)=>{
  let car = {
    brand: req.body.brand,
    model: req.body.model,
    passengers: req.body.passengers,
    doors: req.body.doors,
    gearbox: req.body.gearbox,
    price: req.body.price,
    size: req.body.size,
    available: req.body.available,
    image: req.file.path //!!! tak się zapisuje plik
  }
  await Cars.create(car);
  res.json(car);
  //
}); 

module.exports = router;