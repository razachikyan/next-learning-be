import { Request, Response } from "express";
import { User } from "../services/users";
import StatusCodes from "../statusCodes";

export const SignIn = async (req: Request, res: Response): Promise<any> => {
  const { user_name, user_password, session_id } = req.body;
  try {
    const userInstance = new User();
    userInstance.createUser(user_name, user_password, session_id);
    res.status(201).send(StatusCodes.get(201));
  } catch (err: any) {
    if ("status" in err) {
      res.status(err.status).json(err);
    }
    res.json(err);
  }
};

export const Login = async (req: Request, res: Response): Promise<any> => {
  const { session_id, user_id } = req.body;
  try {
    const userInstance = new User();
    await userInstance.ubdateSession(user_id, session_id);

    res.status(200).send(StatusCodes.get(200));
  } catch (err: any) {
    if ("status" in err) {
      res.status(err.status).json(err);
    }
    res.json(err);
  }
};

export const Logout = async (req: Request, res: Response): Promise<any> => {
  const { user_id } = req.body;
  try {
    const userInstance = new User();
    await userInstance.deleteSession(user_id);

    res.status(204).send(StatusCodes.get(204));
  } catch (err: any) {
    if ("status" in err) {
      res.status(err.status).json(err);
    }
    res.json(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { user_id } = req.body;
  try {
    const userInstance = new User();
    const user = await userInstance.getUserById(user_id);

    res.status(200).send(user);
  } catch (err: any) {
    if ("status" in err) {
      res.status(err.status).json(err);
    }
    res.json(err);
  }
};

export const getUserByUserName = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { user_name } = req.body;
  try {
    const userInstance = new User();
    const user = await userInstance.getUserByUserName(user_name);

    res.status(200).send(user);
  } catch (err: any) {
    if ("status" in err) {
      res.status(err.status).json(err);
    }
    res.json(err);
  }
};

export const getUserBySessionId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { session_id } = req.body;
  try {
    const userInstance = new User();
    const user = await userInstance.getUserBySessionId(session_id);

    res.status(200).send(user);
  } catch (err: any) {
    if ("status" in err) {
      res.status(err.status).json(err);
    }
    res.json(err);
  }
};
