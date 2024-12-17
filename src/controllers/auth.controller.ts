import { AsyncRouteHandler } from "../types";
import { User } from "../models/user.model";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../lib/util";
import { LogInUserDto } from "../dtos/LogInUser.dto";
import { cloudinary } from "../lib/cloudinary";
import { UpdateProfileDto } from "../dtos/UpdateProfile.dto";

export const signUp: AsyncRouteHandler<CreateUserDto> = async (
  req,
  res,
  next
) => {
  try {
    const { email, fullName, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();

      const token = generateToken({
        user: {
          email: newUser.email,
          fullName: newUser.fullName,
          profilePic: newUser.profilePic,
        },
        res,
      });

      return res.status(201).json({
        message: "User created successfully",
        user: {
          email: newUser.email,
          fullName: newUser.fullName,
          profilePic: newUser.profilePic,
          token,
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    next(error);
  }
};

export const logIn: AsyncRouteHandler<LogInUserDto> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    const token = generateToken({
      user: {
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
      },
      res,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logOut: AsyncRouteHandler = async (req, res, next) => {
  try {
    res.cookie("token", "", { httpOnly: true, maxAge: 0 });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateProfile: AsyncRouteHandler<UpdateProfileDto> = async (
  req,
  res,
  next
) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    const upload = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: upload.secure_url },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const checkAuth: AsyncRouteHandler = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ message: "User is authenticated", user: req.user });
  } catch (error) {
    next(error);
  }
};
