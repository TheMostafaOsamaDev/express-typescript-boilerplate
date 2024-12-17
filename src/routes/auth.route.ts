import express from "express";
import {
  checkAuth,
  logIn,
  logOut,
  signUp,
  updateProfile,
} from "../controllers/auth.controller";
import { validateLogIn, validateSignUp } from "../validators/auth.validator";
import { useValidation } from "../lib/util";
import { isAuthedMiddleware } from "../middleware/is-auth.middleware";

const router = express.Router();

router.post("/signup", useValidation(validateSignUp), signUp);

router.post("/login", useValidation(validateLogIn), logIn);

router.delete("/logout", isAuthedMiddleware, logOut);

router.put("/profile", isAuthedMiddleware, updateProfile);

router.get("/check", isAuthedMiddleware, checkAuth);

export default router;
