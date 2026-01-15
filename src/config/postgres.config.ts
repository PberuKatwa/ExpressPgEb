import { Pool, PoolConfig } from "pg";
import { logger } from "../utils/logger.js";
import { EnvConfig } from "../types/env.types.js";

export class PostgresConfig {

  private static pool: Pool | null = null;

  constructor(private readonly env: EnvConfig) {}

  async connect(): Promise<Pool> {
    try {

      if (PostgresConfig.pool) {
        return PostgresConfig.pool;
      }

      logger.info(`Connecting to PostgreSQL: ${this.env.pgHost}:${this.env.pgPort}`);

      const poolConfig: PoolConfig = {
        user: this.env.pgUser,
        host: this.env.pgHost,
        database: this.env.pgDatabase,
        password: this.env.pgPassword,
        port: Number(this.env.pgPort),
      };

      const pool = new Pool(poolConfig);

      const client = await pool.connect();
      await client.query("SELECT 1");
      client.release();

      PostgresConfig.pool = pool;
      logger.info(`PostgreSQL successfully connected`);
      return PostgresConfig.pool;
    } catch (error) {
      throw error;
    }
  }


  static getPool(): Pool {
    if (!PostgresConfig.pool) {
      throw new Error("Postgres pool has not been initialized. Call connect() first.");
    }
    return PostgresConfig.pool;
  }

}
