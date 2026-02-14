import { Router } from "express";
import {
  createNewTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.ts";

const router = Router();

router.post("/create", createNewTodo);
router.get("/todos", getTodos);
router.get("/todos/:todoId", getTodo);
router.delete("/todos/:todoId", deleteTodo);
router.put("/todos/:todoId", updateTodo);

export default router;
