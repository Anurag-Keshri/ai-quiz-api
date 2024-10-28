import { Command } from 'commander';

const program = new Command();

program
  .option('-p, --port <number>', 'Port number for the application', '')
  .parse(process.argv);

const options = program.opts();

export default options;
