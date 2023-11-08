import knex from "knex";
import { CustomError, ISession, IUser } from "../types";
import StatusCodes from "../statusCodes";

export class User {
  private DB: knex.Knex<any, unknown[]>;

  public constructor() {
    this.DB = knex({
      client: "pg",
      connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
    });
  }

  public createSession = async (user_name: string, user_id?: string) => {
    const session_id = Math.random().toString(32);
    const user = await this.getUserByUserName(user_name);
    if (user) {
      await this.DB.table<ISession>("sessions").insert({
        session_id,
        user_id: user.user_id,
      });
    } else {
      await this.DB.table<ISession>("sessions").insert({
        session_id,
        user_id: user_id,
      });
    }

    return session_id;
  };

  public addUser = async (
    user_name: string,
    user_password: string
  ): Promise<string> => {
    try {
      const user_id = Math.random().toString(32);
      const session_id = await this.createSession(user_name, user_id);
      await this.DB.table<IUser>("users").insert({
        user_name,
        user_password,
        session_id,
        user_id,
      });
      return session_id;
    } catch (err: any) {
      const error: CustomError = new Error() as CustomError;
      error.message = StatusCodes.get(404) as string;
      error.status = 404;
      error.additioal = err.message;
      error.type = "custom";

      throw error;
    }
  };

  public ubdateSession = async (
    user_name: string,
    password: string
  ): Promise<string> => {
    const user = await this.getUserByUserName(user_name);
    if (!user) throw new Error(`User with username:${user_name} doesn't exist`);
    if (user.user_password !== password) throw new Error("Wrong password");
    const session = await this.getSessionByUserId(user.user_id);
    const newSession = Math.random().toString(32);
    if (session) {
      await this.DB.table<ISession>("sessions")
        .where({ user_id: user.user_id })
        .update({ session_id: newSession });
    } else {
      await this.createSession(user_name);
    }

    await this.DB.table<IUser>("users")
      .where({ user_id: user.user_id })
      .update({ session_id: newSession });
    return newSession;
  };

  public getSessionByUserId = async (user_id: string): Promise<ISession> => {
    const session = await this.DB.table<ISession>("sessions")
      .select()
      .where({ user_id })
      .limit(1)
      .then((res) => res[0]);
    return session;
  };

  public deleteSession = async (user_id: string): Promise<void> => {
    await this.DB.table<ISession>("sessions").where({ user_id }).delete();
  };

  public getUserById = async (user_id: string): Promise<IUser> => {
    const user = await this.DB.table<IUser>("users")
      .select()
      .where({ user_id })
      .limit(1)
      .then((res) => res[0]);
    if (!user) throw new User();
    return user;
  };

  public getUserByUserName = async (user_name: string): Promise<IUser> => {
    const user = await this.DB.table<IUser>("users")
      .select()
      .where({ user_name })
      .limit(1)
      .then((res) => res[0]);
    return user;
  };

  public getUserBySessionId = async (session_id: string): Promise<IUser> => {
    const session = await this.DB.table<ISession>("sessions")
      .select()
      .where({ session_id })
      .limit(1)
      .then((res) => res[0]);
    if (!session) throw new Error("Wrong session id");

    const user = await this.getUserById(session.user_id);
    return user;
  };
}
