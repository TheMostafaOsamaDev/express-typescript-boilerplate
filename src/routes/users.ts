import { Router } from "express";
import { createUser, getUserById, getUsers } from "../handlers/users";

const router = Router();

// GET /api/users
router.get("/", getUsers);

// GET /api/users/:id
router.get("/:id", getUserById);

// POST /api/users
router.post("/", createUser);

export default router;
