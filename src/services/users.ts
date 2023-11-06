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
  public createUser = async (
    user_name: string,
    user_password: string,
    session_id: string
  ): Promise<void> => {
    try {
      await this.DB.table<IUser>("users").insert({
        user_name,
        user_password,
        session_id,
      });
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
    user_id: string,
    session_id: string
  ): Promise<void> => {
    try {
      const session = await this.getSessionByUserId(user_id);

      if (session) {
        await this.DB.table<ISession>("sessions")
          .where({ user_id })
          .update({ session_id });
      } else {
        await this.DB.table<ISession>("sessions").insert({
          user_id,
          session_id,
        });
      }

      await this.DB.table<IUser>("users")
        .where({ user_id })
        .update({ session_id: session_id });
    } catch (err: any) {
      if ("type" in err && err.type === "custom") {
        throw err;
      }
      const error: CustomError = new Error() as CustomError;
      error.message = StatusCodes.get(404) as string;
      error.status = 404;
      error.additioal = err.message;
      error.type = "custom";

      throw error;
    }
  };

  public getSessionByUserId = async (user_id: string): Promise<ISession> => {
    try {
      const session = await this.DB.table<ISession>("sessions")
        .select()
        .where({ user_id })
        .limit(1)
        .then((res) => res[0]);

      return session;
    } catch (err: any) {
      const error: CustomError = new Error() as CustomError;
      error.message = StatusCodes.get(404) as string;
      error.status = 404;
      error.additioal = err.message;
      error.type = "custom";

      throw error;
    }
  };

  public deleteSession = async (user_id: string): Promise<void> => {
    try {
      await this.DB.table<ISession>("sessions").where({ user_id }).delete();
    } catch (err: any) {
      const error: CustomError = new Error() as CustomError;
      error.message = StatusCodes.get(404) as string;
      error.status = 404;
      error.additioal = err.message;
      error.type = "custom";

      throw error;
    }
  };

  public getUserById = async (user_id: string): Promise<IUser> => {
    try {
      return await this.DB.table<IUser>("users")
        .select()
        .where({ user_id })
        .limit(1)
        .then((res) => res[0]);
    } catch (err: any) {
      const error: CustomError = new Error() as CustomError;
      error.message = StatusCodes.get(404) as string;
      error.status = 404;
      error.additioal = err.message;
      error.type = "custom";

      throw error;
    }
  };

  public getUserByUserName = async (user_name: string): Promise<IUser> => {
    try {
      return await this.DB.table<IUser>("users")
        .select()
        .where({ user_name })
        .limit(1)
        .then((res) => res[0]);
    } catch (err: any) {
      const error: CustomError = new Error() as CustomError;
      error.message = StatusCodes.get(404) as string;
      error.status = 404;
      error.additioal = err.message;
      error.type = "custom";

      throw error;
    }
  };

  public getUserBySessionId = async (session_id: string): Promise<IUser> => {
    try {
      return await this.DB.table<IUser>("users")
        .select()
        .where({ session_id })
        .limit(1)
        .then((res) => res[0]);
    } catch (err: any) {
      const error: CustomError = new Error() as CustomError;
      error.message = StatusCodes.get(404) as string;
      error.status = 404;
      error.additioal = err.message;
      error.type = "custom";

      throw error;
    }
  };
}
