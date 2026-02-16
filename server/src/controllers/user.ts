import type { Request, Response } from "express";
import { User } from "../models/user.ts";
import generateToken from "../utils/generateToken.ts";
import asyncHandler from "../utils/asyncHandler.ts";
import type { AuthRequest } from "../middlewares/authMiddleware.ts";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        message: "User created",
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Something went wrong.Invalid user data.");
    }
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser && (await existingUser.matchPassword(password))) {
    generateToken(res, existingUser._id);

    res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    });
  } else {
    res.status(401);
    throw new Error("Invaild credentials.");
  }
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

export const getUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = {
      _id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email,
    };

    res.status(200).json(user);
  },
);

export const updateUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    // console.log(req.user);

    const user = await User.findById(req.user?._id);

    console.log(user);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.name = req?.body?.name || user.name;
    user.email = req?.body?.email || user.email;
    user.password = req?.body?.password || user.password;

    const updatedUser = await user.save();

    const selectedUser = {
        _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    }

    res.status(200).json(selectedUser);
  },
);
