const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.Signup = async (req, res, next) => {
    try {
        const { fullname, password, username, role, createdAt } = req.body;

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
          return res.json({ message: "User already exists" });
        }
        const user = await User.create({fullname, password, username, role, createdAt });
    
        // const token = createSecretToken(user._id);
        // const dummyToken = () => "staticTokenString";
        // const token = dummyToken();

        function createToken(userId) {
          return jwt.sign({ id: userId }, "5f39bf14ed835883c0bf17ca41947f4c5a9cf2cd58bfa70861947c8d91778ab5", { expiresIn: '1h' });
        }
        const token = createToken(user._id);

    
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });

        res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
       next();

    } catch (error) {
        console.error(error);
      }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body; // getting from Frontend

    if(!username || !password ){
      return res.json({message:'All fields are required'});
    }
    const user = await User.findOne({ username }); // checking from database 

    if(!user){
      return res.json({message:'Incorrect password or username' }); 
    }
   

    const auth = await bcrypt.compare(password,user.password) // comparing hashed passwords

    if (!auth) {
      return res.json({message:'Incorrect password or username' }); 
    }

    // const token = createSecretToken(user._id);
        // const dummyToken = () => "staticTokenString";
        // const token = dummyToken();
        function createToken(userId) {
          return jwt.sign({ id: userId }, "5f39bf14ed835883c0bf17ca41947f4c5a9cf2cd58bfa70861947c8d91778ab5", { expiresIn: '1h' });
        }
        const token = createToken(user._id);
    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User logged in successfully", success: true, userType: user.role });
    next()

  } catch (error) {
    console.error(error);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const allusers = await User.find().sort({createdAt: 1});

    res.status(200).json({allusers}); // passing as a response
  } catch (error){
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports.deleteUsers = async (req, res) => { // admin deleting the user
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error });
  }
};