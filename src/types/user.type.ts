import { Document } from "mongoose";

import { EGender } from "../enums/gender.enum";
import { EUserStatus } from "../enums/user-status.enum";

export interface IUser extends Document {
  name?: string;
  age?: number;
  genders?: EGender;
  email: string;
  password: string;
  status: EUserStatus;
}

export type IUserCredentials = Pick<IUser, "email" | "password">;
