import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserParams } from "../types/query.params";

// GET /api/users
export function getUsers(req: Request, res: Response) {
  res.send([]);
}

// GET /api/users/:id
export function getUserById(req: Request, res: Response) {
  res.send({});
}

// POST /api/users
export function createUser(
  req: Request<{}, {}, CreateUserDto, CreateUserParams>,
  res: Response
) {
  const { username, email, password } = req.body;
  const { logInAfterCreate } = req.query;

  res.send({
    message: "User created successfully",
    data: {
      username,
      email,
      password,
      logInAfterCreate,
    },
  });
}
