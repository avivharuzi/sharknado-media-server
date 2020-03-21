import * as chalk from 'chalk';
import { createConnection } from 'typeorm';

const connect = async (): Promise<void> => {
  try {
    await createConnection();

    console.log(chalk.green('Connected to Database successfully'));
  } catch (err) {
    console.log(chalk.red(`Error in Database connection, ${err}`));
    process.exit();
  }
};

export {
  connect,
};
