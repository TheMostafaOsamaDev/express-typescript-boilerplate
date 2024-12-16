import express, { ErrorRequestHandler } from "express";
import { getUrl, PORT } from "./constants";
import { connectDB } from "./lib/db";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
import authRoutes from "./routes/auth.route";
import { errorHandler } from "./lib/util";

app.get(getUrl("/"), (req, res) => {
  res.send("Hello World");
});

app.use(getUrl("/auth"), authRoutes);

// Error handler
app.use(errorHandler);

// Connect to the database
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
