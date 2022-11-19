import chalk from 'chalk';

export const buildMessage = () => {
  return chalk.blue('Generating minified bundle for production...')
}

export const buildErrorMessage = (err: string) => {
  return chalk.red(err)
}

export const buildWarningMessage = (warning: string) => {
  return chalk.yellow(warning);
}

export const buildSuccessMessage = (success: string) => {
  return chalk.green(success);
}
