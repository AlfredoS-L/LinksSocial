import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTRATION of a new user
export const register = async (req, res) => {
  try {
    // structure and extracation of user details from reques body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      homeCourse,
    } = req.body;

    // password hashed with salt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // CREATE a new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 50),
      impressions: Math.floor(Math.random() * 100),
      homeCourse,
    });
    // UPDATE new user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN for user
export const login = async (req, res) => {
  try {
    // take email and pw from request body
    const { email, password } = req.body;
    // search for email in database
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User was not found." });
    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid login credentials. " });

    // if passwords match, sign a new token with the userID and the secret key
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // remove pw fro mthe user object before sending it for security
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};