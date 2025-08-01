require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const path = require('path');
const connectToMongoDB = require('./db');

const corsOptions = {
    origin: process.env.ORIGIN_URL,
    
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 8000;

// ** Routes ** //
app.use("/api/auth", require('./routes/auth.js'))
app.use("/api/doctors", require('./routes/doctors.js'))
app.use("/api/appointment", require('./routes/appointment.js'))
app.use("/api/patients", require('./routes/patient.js'))
app.use("/api/medicalrecords", require('./routes/medicalRecord.js'))
    app.get("/",async(req,res)=>{
    res.send("Hello World");
})



; (async () => {
    await connectToMongoDB(process.env.MONGODB_URL);

    app.listen(PORT, () => {
       console.log(`Server is listening to port: ${PORT}`);
    })
})()
