import 'reflect-metadata';
import * as chalk from 'chalk';
import * as dotenv from 'dotenv';

import app from './app';
import config from './config';

dotenv.config(); // Load all .env variables.

const hostname = config.server.hostname || '127.0.0.1';
const port = config.server.port || 8080;

app.listen(port, hostname, () => {
  console.log(chalk.blue(`Server running at: http://${hostname}:${port}`));
});
