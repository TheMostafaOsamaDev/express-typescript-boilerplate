import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";

// GET /api/users
export function getUsers(req: Request, res: Response) {
  res.send([]);
}

// GET /api/users/:id
export function getUserById(req: Request, res: Response) {
  res.send({});
}

// POST /api/users
export function createUser(req: Request<{}, {}, CreateUserDto>, res: Response) {
  const { username, email, password } = req.body;

  res.send({
    message: "User created successfully",
    data: {
      username,
      email,
      password,
    },
  });
}
