const mongoose = require('mongoose');
require('dotenv').config({ path: '.env'});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
    });
    console.log('DB is connected')
  } catch (error){
    console.log('An error occurred');
    console.log(error);
    process.exit(1); // stop app
  }
}

module.exports = connectDB;