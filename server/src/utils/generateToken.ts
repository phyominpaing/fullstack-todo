import type { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateToken = (res: Response, userId: Types.ObjectId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // accessible only by the web server
    secure: process.env.NODE_ENV === "production", // https
    sameSite: "strict", // cookie sent only when the request is made by the same site (csrf)
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
