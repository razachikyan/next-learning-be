import { Request, Response } from "express";
import { User } from "../services/users";

export const SignIn = async (req: Request, res: Response): Promise<any> => {
  const { user_name, user_password, session_id } = req.body;
  const userInstance = new User();
  userInstance.createUser(user_name, user_password, session_id);
  res.status(200).send("User created successfully");
};

export const Login = async (req: Request, res: Response): Promise<any> => {
  const { session_id, user_id } = req.body;
  const userInstance = new User();
  await userInstance.ubdateSession(user_id, session_id);

  res.status(201).send("User updated successfully");
};

export const Logout = async (req: Request, res: Response): Promise<any> => {
  const { user_id } = req.body;
  const userInstance = new User();
  await userInstance.deleteSession(user_id);

  res.status(201).send("User deleted successfully");
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { user_id } = req.body;
  const userInstance = new User();
  const user = await userInstance.getUserById(user_id);

  res.status(200).send(user);
};

export const getUserByUserName = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { user_name } = req.body;
  const userInstance = new User();
  const user = await userInstance.getUserByUserName(user_name);

  res.status(200).send(user);
};

export const getUserBySessionId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { session_id } = req.body;
  const userInstance = new User();
  const user = await userInstance.getUserBySessionId(session_id);

  res.status(200).send(user);
};
