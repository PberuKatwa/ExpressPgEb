import { Pool } from "pg";
import { EnvConfig } from "../types/env.types.js";
import { logger } from "../utils/logger.js";
import { PostgresConfig } from "./postgres.config.js";

export async function connectPostgres(env:EnvConfig){
  try {

    const postgres = new PostgresConfig(env)
    const pgPool = await postgres.connect()
    return pgPool

  } catch (error) {
    throw error;
  }
}

export function getPool():Pool {
  try {
    const pgPool = PostgresConfig.getPool();
    return pgPool;
  } catch (error) {
    throw error;
  }
}
