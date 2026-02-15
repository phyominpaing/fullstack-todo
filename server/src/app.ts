import { connectDB } from './db/index.js';
import express, { json } from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.js";
import cors from 'cors';

dotenv.config({
  path: ".env",
});

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
}))
app.use(json());

app.use(todoRoutes)

const PORT = process.env.PORT || "4000";
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
 