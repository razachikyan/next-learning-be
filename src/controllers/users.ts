import { Request, Response } from "express";
import { User } from "../services/users";
import StatusCodes from "../statusCodes";

export const SignIn = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  try {
    const userInstance = new User();
    const sessionId = await userInstance.addUser(username, password);
    res.cookie("sessionId", sessionId);
  } catch (err: any) {
    res.json(err);
  }
};

export const Login = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  try {
    const userInstance = new User();
    const sessionId = await userInstance.ubdateSession(username, password);
    res.cookie("sessionId", sessionId);
  } catch (err: any) {
    res.json(err);
  }
};

export const Logout = async (req: Request, res: Response): Promise<any> => {
  const { username } = req.body;
  try {
    const userInstance = new User();
    const user = await userInstance.getUserByUserName(username);
    await userInstance.deleteSession(user.user_id);

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
  const { sessionId } = req.params;
  try {
    const userInstance = new User();
    const user = await userInstance.getUserBySessionId(sessionId);
    if (!user) {
      throw new Error("Wrong session id");
    }
    res.status(200).send({ username: user.user_name });
  } catch (err: any) {
    console.log(err.message);

    res.json(err);
  }
};
