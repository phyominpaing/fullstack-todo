import type { NextFunction, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import type { AuthRequest } from "../middlewares/authMiddleware";

import { Todo } from "../models/todo";

const authorizeOwner = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { todoId } = req.params;

    const todo = await Todo.findById(todoId);
    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }

    if (todo.userId?.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error("User is not authorized. You are not the owner");
    }
    next();
  },
);

export { authorizeOwner };
