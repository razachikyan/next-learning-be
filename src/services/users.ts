import knex from "knex";
import { ISession, IUser } from "../types";

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
  ) => {
    await this.DB.table<IUser>("users").insert({
      user_name,
      user_password,
      session_id,
    });
  };

  public ubdateSession = async (user_id: string, session_id: string) => {
    const session = await this.getSessionByUserId(user_id);

    if (session) {
      await this.DB.table<ISession>("sessions")
        .where({ user_id })
        .update({ session_id });
    } else {
      await this.DB.table<ISession>("sessions").insert({ user_id, session_id });
    }

    await this.DB.table<IUser>("users")
      .where({ user_id })
      .update({ session_id: session_id });
  };

  public getSessionByUserId = async (user_id: string) => {
    const session = await this.DB.table<ISession>("sessions")
      .select()
      .where({ user_id })
      .limit(1)
      .then((res) => res[0]);

    return session;
  };

  public deleteSession = async (user_id: string) => {
    await this.DB.table<ISession>("sessions").where({ user_id }).delete();
  };

  public getUserById = async (user_id: string) => {
    return await this.DB.table<IUser>("users")
      .select()
      .where({ user_id })
      .limit(1)
      .then((res) => res[0]);
  };

  public getUserByUserName = async (user_name: string) => {
    return await this.DB.table<IUser>("users")
      .select()
      .where({ user_name })
      .limit(1)
      .then((res) => res[0]);
  };

  public getUserBySessionId = async (session_id: string) => {
    return await this.DB.table<IUser>("users")
      .select()
      .where({ session_id })
      .limit(1)
      .then((res) => res[0]);
  };
}
