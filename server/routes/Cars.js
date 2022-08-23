const express = require('express');
const router = express.Router();
const {Cars} = require('../models')

const fs = require('fs/promises');

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

router.post('/', upload,async (req,res)=>{
  let car = {
    brand: req.body.brand,
    model: req.body.model,
    passengers: req.body.passengers,
    doors: req.body.doors,
    gearbox: req.body.gearbox,
    price: req.body.price,
    size: req.body.size,
    available: req.body.available,
    image: req.file.path
  }
  await Cars.create(car);
  res.json(car);
  //
}); 



// const FormData = require('form-data');
// const form = new FormData();

// form.append('brand', 'Opel');
// form.append('model', 'Astra');
// form.append('passengers', 5);
// form.append('doors', 5);
// form.append('gearbox', 'manualna');
// form.append('price', 400);
// form.append('size', 'średni');
// form.append('available', 'dostępny');

// // const image = fs.readFile('./opelastrah.jpg');


// // form.append('image', file, 'opelastrah.jpg');









module.exports = router;