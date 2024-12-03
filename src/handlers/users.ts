import { Request, Response } from "express";

// GET /api/users
export function getUsers(req: Request, res: Response) {
  res.send([]);
}

// GET /api/users/:id
export function getUserById(req: Request, res: Response) {
  res.send({});
}

// POST /api/users
export function createUser(req: Request, res: Response) {
  res.send({});
}
