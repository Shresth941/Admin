import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";

// Helper function to create a JWT token
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "An error occurred during login" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "An error occurred during registration" });
  }
};

export { loginUser, registerUser };
