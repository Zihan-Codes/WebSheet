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
// Middleware
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: ["https://web-sheet-1rsa.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



// const corsOptions = {
//   origin: 'https://web-sheet-1rsa.vercel.app', 
//   optionsSuccessStatus: 200,
//   credentials: true, 
// };
// app.use(cors(corsOptions));


app.use("/", authRoute);
app.use("/tb", tableRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});