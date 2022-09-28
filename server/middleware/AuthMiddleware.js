const {verify} = require('jsonwebtoken');

const validateToken = (req, res, next) =>{
  const accessToken = req.header("accessToken")

  if(!accessToken) return res.json({error: "User not logged in."});

  try{
    const validToken = verify(accessToken, "importantSecret"); //object containing user's info
    req.user = validToken;

    if(validToken) return next();


  } catch(err){
    return res.json({error: err})
  }
}
module.exports = {validateToken};