import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserParams } from "../types/query.params";
import { SendCreatedUserDto } from "../dtos/SendCreatedUser.dto";

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
  res: Response<SendCreatedUserDto>
) {
  const { username, email, password } = req.body;
  const { logInAfterCreate } = req.query;

  res.status(201).send({
    id: 1,
    email,
    username,
  });
}
