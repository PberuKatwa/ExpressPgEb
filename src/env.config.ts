import dotenv from "dotenv";
dotenv.config();
import { EnvConfig, SuffixChecker, GlobalEnvironmentChecker } from "./types/env.types.js";


const getGlobalEnv:GlobalEnvironmentChecker = function ():string {
  try {

    const env = process.env.ENVIRONMENT
    if(!env) throw new Error(`No environmet was found`)
    return env
  } catch (error) {
    throw error;
  }
}

const hasSuffix:SuffixChecker = function (suffix:string):boolean {
    return /_[^_]+$/.test(suffix);
}

const getEnv = function (
  globalEnvCallback: GlobalEnvironmentChecker,
  suffixCallback: SuffixChecker,
  key: string
): string {
  try {

    const global = globalEnvCallback();
    let env = null;
    if (suffixCallback(global)) {
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
