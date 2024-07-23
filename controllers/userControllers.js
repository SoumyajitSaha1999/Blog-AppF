const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// Create user or Register user || POST
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);

    // Validation
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please fill all fields",
        success: false,
      });
    }

    // Existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "User already exists",
        success: false,
      });
    }

    // Hashing Password
    let hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new userModel({username, email, password: hashedPassword,});
    await newUser.save();
    return res.status(201).send({
      message: "New User Created",
      success: true,
      newUser,
    });

  } catch (error) {
    console.log("Error Occurred", error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};



// Get all user || GET
exports.getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      message: "All users get",
      totaluser: users.length,
      success: true,
      users,
    });

  } catch (error) {
    console.log("Error Occurred", error);
    return res.status(500).send({
      message: "Error in get all user callback",
      success: false,
      error,
    });
  }
};



// Login || POST
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        message: "Please provide email or password",
        success: false,
      });
    }

    // User registered or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "Email is not registered",
        success: false,
      });
    }

    // Password valid or not
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Invalid username or password",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Login successful",
      success: true,
      user,
    });
    
  } catch (error) {
    console.log("Error Occurred", error);
    return res.status(500).send({
      message: "Error in login callback",
      success: false,
      error,
    });
  }
};
