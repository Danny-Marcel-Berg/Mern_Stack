import User from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Helper error generator
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

// In-memory user fallback storage when DB is unavailable
export const memoryUsers = [];

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  if (mongoose.connection.readyState === 1) {
    try {
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      });
      await newUser.save();
      const { password: pass, ...rest } = newUser._doc;
      return res.status(201).json({ message: "Signup successful", user: rest });
    } catch (error) {
      if (error.name === "MongoServerError" && error.code === 11000) {
        return next(errorHandler(400, "User or Email already exists"));
      }
    }
  }

  // Fallback to in-memory store
  const existingMemUser = memoryUsers.find((u) => u.email === email || u.username === username);
  if (existingMemUser) {
    return next(errorHandler(400, "User or Email already exists"));
  }

  const memUser = {
    _id: "mem_" + Date.now(),
    username,
    email,
    password: hashedPassword,
    avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    createdAt: new Date(),
  };
  memoryUsers.push(memUser);

  const { password: pass, ...rest } = memUser;
  return res.status(201).json({ message: "Signup successful", user: rest });
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    let validUser = null;
    if (mongoose.connection.readyState === 1) {
      try {
        validUser = await User.findOne({ email });
      } catch (err) {
        validUser = null;
      }
    }

    if (!validUser) {
      validUser = memoryUsers.find((u) => u.email === email);
    }

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const jwtSecret = process.env.JWT_SECRET || "supersecretkey123";
    const token = jwt.sign({ id: validUser._id }, jwtSecret, { expiresIn: "1d" });

    const userObj = validUser._doc ? validUser._doc : validUser;
    const { password: pass, ...rest } = userObj;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ token, user: rest });
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
