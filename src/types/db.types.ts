export interface BaseDbConfig {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
  logging?: boolean | ((msg: string) => void);
}

export interface ProdDbConfig extends BaseDbConfig {
  pool?: {
    max?: number;
    min?: number;
    idleTimeoutMillis?: number;
    connectionTimeoutMillis?: number;
  };
}
