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
import authRoute from "./routes/auth.route";
import messageRoute from "./routes/message.route";

app.use(getUrl("/auth"), authRoute);
app.use(getUrl("/message"), messageRoute);

// Error handler
import { errorHandler } from "./lib/util";
app.use(errorHandler);

// Connect to the database
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
