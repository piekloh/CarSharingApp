const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//Static folder
app.use('/Images', express.static('../client/public/Images'))

//Routers

const carRouter = require('./routes/Cars');
app.use('/cars', carRouter);



db.sequelize.sync().then(()=>{
  app.listen(3001, () => {
    console.log("server running on port 3001")
  });
});
