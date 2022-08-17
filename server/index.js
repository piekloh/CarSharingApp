const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());
//Routers

const carRouter = require('./routes/Cars');
app.use('/cars', carRouter);







// //image to db//
// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//   destination: (req, file, cb)=>{
//     cb(null, '../client/Images')
//   },
//   filename: (req, file, cb)=>{
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({
//   storage: storage,
//   limits: {fileSize: '5000000'}, //5 mb(5 000 000 bajtów)
//   fileFilter: (req, file, cb) =>{
//     const fileTypes = /jpeg|jpg|png|gif/
//     const mimeType = fileTypes.test(file.mimetype) //sprawdza, czy dobry format
//     const extname = fileTypes.test(path.extname(file.originalname))

//     if(mimeType && extname){
//       return cb(null, true)
//     }
//     cb('Give proper files formate to upload') //może być potrzebne else
//   }
// }).single('image') //ten sam "image" co w models/Cars.js
// //single, czyli, że będziemy dodawać tylko 1 obrazek


// module.exports={
//   upload
// }
// //image to db//



db.sequelize.sync().then(()=>{
  app.listen(3001, () => {
    console.log("server running on port 3001")
  });
});
