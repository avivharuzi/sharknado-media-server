import * as copy from 'recursive-copy';
import * as path from 'path';

import * as chalk from 'chalk';
import * as del from 'del';
import * as exec from 'await-exec';

const PUBLIC_SITE_PATH = path.join(__dirname, '..', 'public', 'site');
const SERVER_DIST_PATH = path.join(__dirname, '..', 'dist');
const WEB_DIST_PATH = path.join(__dirname, '..', 'web', 'dist', 'web');

(async () => {
  console.log(chalk.green('***** Start building the project *****'));

  try {
    console.log(chalk.yellow('<<< Start building web files... >>>'));
    await exec('cd web && npm run build:prod');
  } catch (error) {
    console.log(chalk.red(`There was a problem to build web files, error: ${error}`));
    process.exit(1);
  }

  try {
    console.log(chalk.yellow('<<< Removing public/site old files... >>>'));
    await del([`!${path.join(PUBLIC_SITE_PATH, '.gitkeep')}`, `${PUBLIC_SITE_PATH}/**`]);
  } catch (error) {
    console.log(chalk.red(`There was a problem to remove public/site old files, error: ${error}`));
    process.exit(2);
  }

  try {
    console.log(chalk.yellow('<<< Copying web files to public/site >>>'));
    await copy(WEB_DIST_PATH, PUBLIC_SITE_PATH);
  } catch (error) {
    console.log(chalk.red(`There was a problem to copy web files to public/site, error: ${error}`));
    process.exit(3);
  }

  try {
    console.log(chalk.yellow('<<< Build server files >>>'));
    await del(SERVER_DIST_PATH);
    await exec('npm run build');
  } catch (error) {
    console.log(chalk.red(`There was a problem to build server files, error: ${error}`));
    process.exit(4);
  }

  console.log(chalk.green('***** The project was built successfully *****'));
})();
