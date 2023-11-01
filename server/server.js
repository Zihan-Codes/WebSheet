const express = require('express');
const connectDB = require('./db');
require("dotenv").config();
const cors = require("cors");
const  PORT  = process.env.PORT || 5000;
const authRoute = require("./Routes/AuthRoute");
const tableRoute = require("./Routes/TableRoute");

const app = express();

// Connect to MongoDB
connectDB();


const corsOptions = {
  origin: "https://web-sheet-1rsa.vercel.app", // Replace with your front-end's actual origin
  // methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Important when dealing with credentials
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());


app.use("/", authRoute);
app.use("/tb", tableRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});