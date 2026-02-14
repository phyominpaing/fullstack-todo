import { connectDB } from './db/index.ts';
import express, { json } from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.ts";

dotenv.config({
  path: ".env",
});

const app = express();
app.use(json());

app.use(todoRoutes)

const PORT = process.env.PORT || "4000";
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
 