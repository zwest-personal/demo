/* eslint-disable n/no-process-env */

import path from 'path';
import moduleAlias from 'module-alias';

// Check the env
const NODE_ENV = (process.env.NODE_ENV ?? 'development');

// Import using dotenv-safe
// Ensures we all have all variables defined in the .env.example file
require('dotenv-safe').config({
    example: path.join(__dirname, `./config/.env.example`),
    path: path.join(__dirname, `./config/.env.${NODE_ENV}`),
    allowEmptyValues: true
})

// Configure moduleAlias
if (__filename.endsWith('js')) {
    moduleAlias.addAlias('@src', __dirname + '/dist');
}
