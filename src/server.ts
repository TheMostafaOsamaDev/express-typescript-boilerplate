import express, { NextFunction, Request, Response } from "express";

const app = express();

// Routes
import userRouter from "./routes/users";

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`\nExpress & Typescript server running on port: ${PORT}\n`)
);
