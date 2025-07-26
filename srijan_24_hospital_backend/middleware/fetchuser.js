require('dotenv').config();
const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    // get the user from jwt token and add the id to the req object
    const token = req.header('auth-token')
    // return an error if the token doesn't exist
    if(!token){
        res.send({success:false,message: "token not found"})
    }

    // verify the user using jwt token
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next(); 
    } catch (error) {
        res.send({success:false,message: "Please authenticate with a valid token"})
    } 
}

module.exports = fetchuser;