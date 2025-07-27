const express = require('express');
const Doctor = require('../models/Doctor');
const User = require('../models/User')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')


// ROUTE 1 - Getting the data of all the doctors (with searching) using: GET
router.get('/getalldoctors', async(req, res) => {

    const {name, speciality, hospital, email} = req.query;
    const queryObject = {};

    // adding the searching facility
    if(name){
        queryObject.name = {$regex: name, $options: "i"};
    }
    if(speciality){
        queryObject.speciality = {$regex: speciality, $options: "i"};
    }
    if(hospital){
        queryObject.hospital = {$regex: hospital, $options: "i"};
    }
    if(email){
        queryObject.email = {$regex: email, $options: "i"};
    }

    // getting the doctors data
    const doctorsData = await Doctor.find(queryObject);
    res.status(200).json(doctorsData);
})

// // ROUTE 2 - Getting the data of a doctor using the "_id" (with searching) using: POST
router.get('/getdoctorbyid/:doctorId', async(req, res) => {
    try {
        // get the doctorId from the params of react uri for each doctors
        const doctor = await Doctor.findOne({_id: req.params.doctorId});
        res.status(200).send(doctor);
    } catch (error) {
        res.status(500).send("500: Internal Server Error")
    }
})
router.get('/filtereddoctors/:keyword',async(req,res)=>{
    try{
        const {keyword}=req.params;
        const doctors=await Doctor.find({
            $or : [{name: {$regex:keyword,$options:"i"} },//regex means regular expression,searches accordinfg to the keyword ,$options:i says case insensitive
            {hospital: {$regex:keyword,$options:"i"} },
            {speciality: {$regex:keyword,$options:"i"} }
            ]})
            console.log(doctors)
            res.send({
                success:true,
                message:"searched",
                doctors
            })
        }
        catch(err){
            res.send({
                success:false,
                message:err.message
            })
}
})

// ROUTE 3 - 
router.get('/getdoctorbyuserid', fetchuser, async(req, res) => {
    try {
        // get the doctorId from the params of react uri for each doctors
        const doctor = await Doctor.findOne({user: req.user.id});
        res.status(200).send(doctor);
    } catch (error) {
        res.status(500).send("500: Internal Server Error")
    }
})

// ROUTE 4 - create a new Doctor using: POST "/api/doctors/createdoctor". Login required
router.post('/createdoctor', fetchuser, async(req, res) => {

    try {
        // checking if the doctor already exists or not
        let doctor = await Doctor.findOne({email: req.body.email});
        if(doctor){
            return res.status(400).send({ success: false, error: "Sorry! an user with this email already exists" })
        }

        // creating a new doctor
        doctor = await new Doctor({...req.body, user: req.user.id});
        await doctor.save();
        // console.log(doctor)
        res.status(200).send({success: true, doctor});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({success: false, message:"500: Internal Server Error"})
    }
})
router.put("/update-doctor",fetchuser,async(req,res)=>{
    try{
let user=await Doctor.findOne({ user: req.user.id })
console.log("hello");
console.log(user);
console.log("hell")
console.log(req.body);
if(user){
let result= await Doctor.findByIdAndUpdate(req.body.id,{
name:req.body.name || user.name,
contact:req.body.contact || user.contact,
email:req.body.email || user.email,
fees:req.body.fees || user.fees,
experienceInYears:req.body.experienceInYears || user.experienceInYears,
qualification:req.body.qualification || user.qualification,
days:req.body.days || user.days,
starttime:req.body.starttime || user.starttime,
endtime:req.body.endtime || user.endtime,
speciality:req.body.speciality || user.speciality,
hospital:req.body.hospital || user.hospital,
},{new:true});
res.send({success:true,result});
console.log("hello 2nd////////////////////////////////////////////////////////////////////////")
console.log(result);
}

    else{
        res.send({success:false})
    }


    }
    catch(err){
        console.log("error ") ;       
    }
})

module.exports = router;