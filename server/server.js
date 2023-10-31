const express = require('express');
const connectDB = require('./db');
require("dotenv").config();
const cors = require("cors");
const { PORT } = process.env;
const authRoute = require("./Routes/AuthRoute");
const tableRoute = require("./Routes/TableRoute");

const app = express();

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: ["http://web-sheet.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

app.use("/", authRoute);
app.use("/tb", tableRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});