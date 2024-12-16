import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import { Request, Response, NextFunction } from "express";
import { UserType } from "../models/user.model";

export const generateToken = ({
  user,
  res,
}: {
  user: Pick<UserType, "email" | "fullName" | "profilePic">;
  res: Response;
}) => {
  const token = jwt.sign(
    {
      user,
    },
    JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "strict",
  });

  return token;
};

import { ValidationChain, validationResult } from "express-validator";
import { ErrorHandler } from "../types";

export const useValidation = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Don't return the response directly. Just call res.status().json() and then return.

      res.status(400).json({ errors: errors.array() });
      return; // ensure the function doesn't attempt further execution
    }

    next();
  };
};

// Error handler
export const errorHandler: ErrorHandler = (err, req, res, next) => {
  const message = err.message || "Internal server error";
  res.status(500).json({ message });
};
