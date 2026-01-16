import dotenv from "dotenv";
dotenv.config();
import { EnvConfig, GlobalEnvironmentSuffix, GlobalEnvironmentChecker } from "./types/env.types.js";


const getGlobalEnv = function ():string {
  try {

    const env = process.env.ENVIRONMENT
    if(!env) throw new Error(`No environmet was found`)
    return env
  } catch (error) {
    throw error;
  }
}

function hasSuffix(global:string):boolean {
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
    if (!env) throw new Error(`No env for key:${key} was found`);
    return env

  } catch (error) {
    throw error;
  }
}

export const envConfig:EnvConfig = {
  environment:getEnv(getGlobalEnv,hasSuffix,"ENVIRONMENT"),
  port: getEnv(getGlobalEnv,hasSuffix,"PORT"),
  pgHost: getEnv(getGlobalEnv,hasSuffix,"PG_HOST"),
  pgPort: getEnv(getGlobalEnv,hasSuffix,"PG_PORT"),
  pgUser: getEnv(getGlobalEnv,hasSuffix,"PG_USER"),
  pgPassword: getEnv(getGlobalEnv,hasSuffix,"PG_PASSWORD"),
  pgDatabase: getEnv(getGlobalEnv,hasSuffix,"PG_DATABASE")
}
