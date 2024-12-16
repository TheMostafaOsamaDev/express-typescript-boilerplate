import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { AsyncRouteHandler } from "../types";
import { JWT_SECRET } from "../constants";

export const isAuthedMiddleware: AsyncRouteHandler = async (req, res, next) => {
  try {
    const token = req.headers.token;

    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(`${token}`, JWT_SECRET!) as {
      user: { email: string };
    };

    if (!decoded) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    const user = await User.findOne({ email: decoded.user.email }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
