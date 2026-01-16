import dotenv from "dotenv";
dotenv.config();
import { EnvConfig } from "./types/env.types.js";

function getEnv(environment: string):string {
  try {

  } catch (error) {
    throw error;
  }
}

function getEnvVars(key: string):string {
  try {

    const env = process.env[key];
    if (!env) throw new Error(`No env for key:${key} was found`);
    return env

  } catch (error) {
    throw error;
  }
}

export const envConfig:EnvConfig = {
  environment:getEnv("ENVIRONMENT"),
  port: getEnv("PORT"),
  pgHost: getEnv("PG_HOST"),
  pgPort: getEnv("PG_PORT"),
  pgUser: getEnv("PG_USER"),
  pgPassword: getEnv("PG_PASSWORD"),
  pgDatabase: getEnv("PG_DATABASE")
}
