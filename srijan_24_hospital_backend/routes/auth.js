require('dotenv').config();
const express = require('express')
const User = require('../models/User')
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const Appointment = require('../models/Appointment');

// ROUTE 1 - "Sign Up" an User using: POST "/api/auth/signup". No SignIn required
router.post('/signup', [
    body('username', 'Enter a valid username').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').isLength({ min: 5 })
], async (req, res) => {

    let success = false;

    // if there exist error then send bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    console.log(req.body);
    try {
        // check if the user already exists or not
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send({ success, error: "Sorry! an user with this email already exists" })
        }

        // securing the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: securePassword,
            isDoctor: req.body.isDoctor
        })
         // getting the user.id as a unique data for the payload of jwt
        const data = {
            user: {
                id: user.id
            }
        }
        if(req.body.isDoctor){
        const doc=await new Doctor({
            user:user.id,
            name:" ",
            contact:" ",
            email:req.body.email,
            fees:0,
            experienceInYears:0,
            qualification:" ",
            days:" ",
            starttime:" ",
            endtime:" ",
            speciality:" ",
            hospital:" "
        }).save()
        console.log(doc);
          // then signing the data(user.id) with the jwt_secret
        
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
            res.json({
            success: true, authToken,doc, user: {
                _id: user.id,
                username: user.username,
                email: user.email,
                isDoctor: user.isDoctor
            }
        });
    }
    else{
        const pat=await new Patient({
            user:user.id,
            firstName:" ",
            lastName:" ",
            dateOfBirth:new Date().toISOString(),
            gender:"Not filled",
            bloodGroup:"Not filled",
            phoneNumber:" ",
            street:" ",
            city:" ",
            state:" ",
            pinCode:" ",
            medicalRecords:[],
            Appointment:[]

        });
        await pat.save();
        console.log(pat);
           // then signing the data(user.id) with the jwt_secret
        
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
            res.json({
            success: true, authToken,pat, user: {
                _id: user.id,
                username: user.username,
                email: user.email,
                isDoctor: user.isDoctor
            }
            
            
        });
    }
  
        console.log(user);

       
     
    

    } catch (error) {
        // console.log(error.message);
        res.status(500).send({ success: false, message: error.message })
    }

})
router.put("/changepassword",fetchuser,async(req,res)=>{
    try{
           console.log(req.body)
        let user = await User.findById(req.body.id);
          let passwordCompare = await bcrypt.compare(req.body.oldpassword, user.password);

        // if the password doesn't equal with the original password(user.password) the show error
        if (!passwordCompare) {
            return res.send({ success:false, message: "Old password is wrong!" })
        }
        //console.log(req.body.id);
        //console.log(user)
        if(user){

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        let changed=await User.findByIdAndUpdate(req.body.id,{
        password:securePassword || user.password
        },{new:true});
         res.send({success:true});
        }
        else{
            res.send({success:false,message:"user not found"});
        }
    }
    catch(err){
        res.send({success:false,message:err.message});
    }
})


// ROUTE 2 - "Sign in" an User using: POST "/api/auth/signin".
router.post('/signin', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {

    let success = false;

    // if there exist error then send bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ success, message: "This user does not exist!!" })
        }

        // compare the password with the bcrypt.compare
        // await bcrypt.compare(password, user.password, function (err, res) {
        //     if(err){
        //         console.log({error: "Please, try to login with correct Credentials"})
        //     }
        // });

        let passwordCompare = await bcrypt.compare(password, user.password);

        // if the password doesn't equal with the original password(user.password) the show error
        if (!passwordCompare) {
            return res.status(400).json({ success, message: "Please, try to login with correct Credentials" })
        }

        // getting the user.id as a unique data for the payload of jwt
        const data = {
            user: {
                id: user.id,
            }
        }
        // then signing the data(user.id) with the jwt_secret
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({
            success: true, authToken: authToken, user: {
                _id: user.id,
                username: user.username,
                email: user.email,
                isDoctor: user.isDoctor
            }
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: "500: Internal Server Error!" })
    }
})


// ROUTE 3 - Getting logged in User details using: POST "/api/auth/getuser". Signin required.

// whenever the Signin is required use the middleware(fetchuser) to get the user.id
router.get('/getuser', fetchuser, async (req, res) => {

    try {
        let userId = req.user.id;
        // selecting all details except the password
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: "500: Internal Server Error!" })
    }

})


//ROUTE 3-CHECK EMAIL
router.post('/checkemail',
    async(req,res)=>{
           try {
            console.log(req.body);
            const { email } = req.body;
         
            let user = await User.findOne({ email: email });  // i forgot to write await here.The problem i faced was that the user was not found.
            console.log(user.username);
            console.log(email)
            if (!user) {
                return res.send({ success: false, message: "You are not registered" });
            }
            res.send({ success:true});
           
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send({ success: false, message: "500: Internal Server Error!" })
        }
    }
)

// ROUTE 4 - FORGET PASSWORD 
router.post('/forgotpassword', 
    async (req, res) => {
       
        try {
            console.log(req.body);
            const { email } = req.body;
         
            let user = await User.findOne({ email: email });  // i forgot to write await here.The problem i faced was that the user was not found.
            console.log(user.username);
            console.log(email)
            if (!user) {
                return res.send({ success: false, message: "You are not registered" });
            }

            else {
                //create token for authentication
                // let token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET);//signing the payload which contains _id of the user
                // getting the user.id as a unique data for the payload of jwt
                const data = {
                    user: {
                        id: user.id
                    }
                }
                // then signing the data(user.id) with the jwt_secret
                const authToken = jwt.sign(data, process.env.JWT_SECRET);
                res.json({
                    success: true, authToken, user: {
                        _id: user.id,
                        username: user.username,
                        email: user.email,
                        isDoctor: user.isDoctor
                    }
                });
            }
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send({ success: false, message: "500: Internal Server Error!" })
        }

    }
)

module.exports = router;