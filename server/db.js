const mongoose = require('mongoose');
require("dotenv").config();
const { MONGO_URL } = process.env;

const connectDB = async () => {
  try {
        await mongoose.connect("mongodb+srv://zihanwplans:XNUEyEsZqh4PfmT9@cluster0.4krs4bg.mongodb.net/websheet?retryWrites=true&w=majority", {
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
