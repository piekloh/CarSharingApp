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
const opinionRouter = require('./routes/Opinions');
app.use('/opinions', opinionRouter);
const userRouter = require('./routes/Users');
app.use('/auth', userRouter);
const reservationRouter = require('./routes/Reservations');
app.use('/reservations', reservationRouter);



db.sequelize.sync().then(()=>{
  app.listen(3001, () => {
    console.log("server running on port 3001")
  });
});
