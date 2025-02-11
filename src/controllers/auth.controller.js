import { generateToken } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All feilds are require" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character" });
    }

    const user = await User.findOne({ email });
    console.log("user", user);

    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }

    const salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      const token = generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("error in user controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all feilds are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found please sign up" });
    }

    const isPassWordCorrect = await bcrypt.compare(password, user.password);

    if (!isPassWordCorrect) {
      return res.status(400).json({ message: "invalid credential" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("error in login contoller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout succesfully!" });
  } catch (error) {
    console.error("error in logout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = (req, res) => {
  try {
  } catch (error) {
    console.error("error in update Profile controller", error);
    res.status(500), json({ message: "Internal Server Error" });
  }
};
