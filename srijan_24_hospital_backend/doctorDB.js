require('dotenv').config();
const connectToMongoDB = require('./db');
// const Doctor = require('./models/Doctor');

// const doctorJson = require('./doctors.json');

const start = async() => {
    try {
        await connectToMongoDB(process.env.MONGODB_URL);
        
        console.log("success");
    } catch (error) {
        console.log(error);
    }
}

start();