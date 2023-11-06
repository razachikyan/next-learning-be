export interface IUser {
  user_name: string;
  user_password: string;
  session_id: string;
  user_id: string;
}

export interface ISession {
  session_id: string;
  user_id: string;
}

export interface CustomError extends Error {
  status: number;
  additioal: string;
  type: string;
}
