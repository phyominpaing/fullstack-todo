import type { Request, Response } from "express";
import { Todo } from "../models/todo.ts";

export const createNewTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const newTodo = await Todo.create({
      title,
    });
    res.status(201).json({ message: "New Todo Created", todo: newTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ message: "All Todos Fetched", todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    const todo = await Todo.findById(todoId);
    res.status(200).json({ message: "Todo Fetched", todo: todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { title } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, { title });
    res
      .status(200)
      .json({ message: "Todo has been updated", todo: updatedTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(todoId);
    res.status(200).json({ message: "Todo has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
