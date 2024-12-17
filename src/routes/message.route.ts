import express from "express";
import { isAuthedMiddleware } from "../middleware/is-auth.middleware";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller";

const router = express.Router();

router.get("/users", isAuthedMiddleware, getUsersForSidebar);

router.get("/:id", isAuthedMiddleware, getMessages);

router.post("/send/:id", isAuthedMiddleware, sendMessage);

export default router;
