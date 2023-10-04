import { Document } from "mongoose";

import { EGender } from "../enums/gender.enum";

export interface IUser extends Document {
  name?: string;
  age?: number;
  genders?: EGender;
  email: string;
  password: string;
}

export type IUserCredentials = Pick<IUser, "email" | "password">;