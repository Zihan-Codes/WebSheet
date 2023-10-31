const mongoose = require('mongoose');
require("dotenv").config();
const { MONGO_URL } = process.env;

const connectDB = async () => {
  try {
        await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
