import dotenv from "dotenv";
dotenv.config();
import { EnvConfig } from "./types/env.types.js";

function getGlobalEnv():string {
  try {

    const env = process.env.ENVIRONMENT
    if(!env) throw new Error(`No environmet was found`)
    return env
  } catch (error) {
    throw error;
  }
}

// function getEnv(key: string):string {
//   try {

//     const env = process.env[key];
//     if (!env) throw new Error(`No env for key:${key} was found`);
//     return env

//   } catch (error) {
//     throw error;
//   }
// }

function hasSuffix(global:string) {
    return /_[^_]+$/.test(global);
}

function getEnv(globalEnv,suffix, key: string
): string {
  try {

    const global = globalEnv();
    let env = null;
    if (suffix(global)) {
      env = process.env[`${key}_${global}`];
    } else {
      env = process.env[key];
    }

    const
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
