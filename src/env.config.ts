import dotenv from "dotenv";
dotenv.config();
import { EnvConfig, SuffixChecker, GlobalEnvironmentChecker } from "./types/env.types.js";


const getGlobalEnvironment:GlobalEnvironmentChecker = function ():string {
  try {

    const env = process.env.ENVIRONMENT
    if(!env) throw new Error(`No environmet was found`)
    return env
  } catch (error) {
    throw error;
  }
}

const hasSuffix: SuffixChecker = function (value: string, suffix: string): boolean {
  const pattern = new RegExp(`_${suffix}$`);
  return pattern.test(value);
}

const getEnv = function (
  globalEnvCallback: GlobalEnvironmentChecker,
  suffixCallback: SuffixChecker,
  key: string
): string {
  try {

    const global = globalEnvCallback();
    let env = null;
    console.log("globall envvv", global, "keyy", key)
    const result = suffixCallback(global, key)
    console.log("result", result)
    if (suffixCallback(global,key)) {
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
  environment:getEnv(getGlobalEnvironment,hasSuffix,"ENVIRONMENT"),
  port: getEnv(getGlobalEnvironment,hasSuffix,"PORT"),
  pgHost: getEnv(getGlobalEnvironment,hasSuffix,"PG_HOST"),
  pgPort: getEnv(getGlobalEnvironment,hasSuffix,"PG_PORT"),
  pgUser: getEnv(getGlobalEnvironment,hasSuffix,"PG_USER"),
  pgPassword: getEnv(getGlobalEnvironment,hasSuffix,"PG_PASSWORD"),
  pgDatabase: getEnv(getGlobalEnvironment,hasSuffix,"PG_DATABASE")
}
