export interface EnvConfig{
  environment:string,
  port: string,
  pgHost: string,
  pgPort: string,
  pgUser: string,
  pgPassword: string,
  pgDatabase: string
}

export type GlobalEnvironmentSuffix = () => boolean;
export type GlobalEnvironmentChecker = () => string;
