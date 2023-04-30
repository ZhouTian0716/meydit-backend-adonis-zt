/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env';

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  DB_CONNECTION: Env.schema.string(),
  CONNECT_RDS:Env.schema.boolean(),
  PG_HOST: Env.schema.string({ format: 'host' }),
  PG_PORT: Env.schema.number(),
  PG_USER: Env.schema.string(),
  PG_PASSWORD: Env.schema.string.optional(),
  PG_DB_NAME: Env.schema.string(),
  AWS_RDS_PG_HOST: Env.schema.string({ format: 'host' }),
  AWS_RDS_PG_PORT: Env.schema.number(),
  AWS_RDS_PG_USER: Env.schema.string(),
  AWS_RDS_PG_PASSWORD: Env.schema.string.optional(),
  AWS_RDS_PG_DB_NAME: Env.schema.string(),
  AWS_S3_REGION: Env.schema.string(),
  AWS_S3_BUCKET: Env.schema.string(),
  AWS_S3_ACCESS_KEY_ID: Env.schema.string(),
  AWS_S3_SECRET_ACCESS_KEY: Env.schema.string(),
});
