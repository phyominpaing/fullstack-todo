import { Router } from "express";
import {
  createNewTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.ts";
import { protect } from "../middlewares/authMiddleware.ts";
import { authorizeOwner } from "../middlewares/authorizeOwner.ts";

const router = Router();

router.post("/create", protect, createNewTodo);
router.get("/todos", getTodos);
router.get("/todos/:todoId", getTodo);
router.put("/todos/:todoId", protect, authorizeOwner, updateTodo);
router.delete("/todos/:todoId", protect, authorizeOwner, deleteTodo);

export default router;
