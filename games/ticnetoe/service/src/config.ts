/* eslint-disable n/no-process-env */

/**
 * This Config uses dotenv/dotenv to load in .env files
 *
 * The config files should exist, but if the file for 'this' env is empty
 * an error will occur if the environment does not have the required values.
 *
 * Had used dotenv-safe before but that has no validation on the fields and envalid
 * can take over checking that they exist, so switched to dotenv.
 */

import {config as dotenv} from 'dotenv';
import {resolve} from 'path';
import {cleanEnv, str} from 'envalid';

const configFile = resolve(__dirname, `../config/.env.${process.env.ENV}`);

// dotenv will parse the .env file and set it in the process env
dotenv({
  path: configFile,
  override: false,
});

// Config is our actual processed configuration
const Config = cleanEnv(process.env, {
  ENV: str({choices: ['local', 'test', 'dev']}), // No prod for now
  LOG_LEVEL: str({choices: ['trace', 'debug', 'info', 'warn', 'error']}),
  API_PATH: str(),
});

export default Config;