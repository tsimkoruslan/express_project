import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
};
