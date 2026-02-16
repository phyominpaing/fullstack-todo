import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import { User } from "../models/user.ts";
import { Types } from "mongoose";

export interface AuthRequest extends Request {
  user?: {
    _id: string | Types.ObjectId;
    name: string;
    email: string;
  };
}

interface User {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
}

const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("Unauthorized user.");
    }

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!,
        ) as JwtPayload;

        if (!decoded) {
          res.status(401);
          throw new Error("Unauthorized user. Invalid token.");
        }
        req.user = (await User.findById(decoded.userId).select(
          "-password",
        )) as User;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Unauthorized user. Invalid token.");
      }
    }
  },
);

export { protect };
