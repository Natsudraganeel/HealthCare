require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToMongoDB = require('./db');

const corsOptions = {
    origin: process.env.ORIGIN_URL,
    
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 8000;
// Serve static files (Vite build)
app.use(express.static(path.join(__dirname, 'client', 'dist')));
// ** Routes ** //
app.use("/api/auth", require('./routes/auth.js'))
app.use("/api/doctors", require('./routes/doctors.js'))
app.use("/api/appointment", require('./routes/appointment.js'))
app.use("/api/patients", require('./routes/patient.js'))
app.use("/api/medicalrecords", require('./routes/medicalRecord.js'))
//     app.get("/",async(req,res)=>{
//     res.send("Hello World");
// })


//  Fallback to index.html for client-side routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
; (async () => {
    await connectToMongoDB(process.env.MONGODB_URL);

    app.listen(PORT, () => {
       console.log(`Server is listening to port: ${PORT}`);
    })
})()
