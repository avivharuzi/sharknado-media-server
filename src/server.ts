import * as chalk from 'chalk';

import app from './app';
import config from './config';

const hostname = config.server.hostname || '127.0.0.1';
const port = config.server.port || 8080;

app.listen(port, hostname, () => {
  console.log(chalk.blue(`Server running at: http://${hostname}:${port}`));
});
