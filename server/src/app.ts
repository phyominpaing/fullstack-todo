import express, { json } from "express";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const app = express();
app.use(json());

app.use("/", (req, res) => {
  res.json("hello world");
});

const PORT = process.env.PORT || "4000";
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
