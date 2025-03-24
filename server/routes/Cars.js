const express = require("express");
const router = express.Router();
const { Cars } = require("../models");
const fs = require("fs");

////////////////////image to db///////////////////
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./../client/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    //path.extname(...) returns extension of a file, so ".jpg"
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "5000000" }, //5 mb(5 000 000 bytes)
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype); //check if correct format
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image"); //the same "image" as in models/Cars.js(column in DB)
//"single" means we are adding one picture

module.exports = {
  upload,
};
//
////////////////////image to db////////////////////

router.get("/", async (req, res) => {
  const listOfCars = await Cars.findAll();
  res.json(listOfCars);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const car = await Cars.findOne({ where: { id: id } });
  res.json(car);
});

router.post("/", upload, async (req, res) => {
  let car = {
    brand: req.body.brand,
    model: req.body.model,
    passengers: req.body.passengers,
    doors: req.body.doors,
    gearbox: req.body.gearbox,
    price: req.body.price,
    size: req.body.size,
    available: req.body.available,
    image: req.file.path, //!!! the way of saving files
  };
  await Cars.create(car);
  res.json(car);
  //
});

router.delete("/:carId", async (req, res) => {
  const carId = req.params.carId;
  const car = await Cars.findOne({ where: { id: carId } });
  const imagePath = car.image;
  console.log(imagePath);
  fs.unlinkSync(imagePath);
  await Cars.destroy({ where: { id: carId } });

  res.json("Car deleted");
});

router.put("/edit/:carId", upload, async (req, res) => {
  const carId = req.params.carId;
  const carToUpdate = await Cars.findOne({ where: { id: carId } });
  const imagePath = carToUpdate.image;
  fs.unlinkSync(imagePath);

  let car = {
    brand: req.body.brand,
    model: req.body.model,
    passengers: req.body.passengers,
    doors: req.body.doors,
    gearbox: req.body.gearbox,
    price: req.body.price,
    size: req.body.size,
    available: req.body.available,
    image: req.file.path,
  };

  await carToUpdate.update(car);

  res.json("Car changed");
});

module.exports = router;
