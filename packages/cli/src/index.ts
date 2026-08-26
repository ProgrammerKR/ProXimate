#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('proximate')
  .description('CLI for ProXimate animation toolkit')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize ProXimate configuration in your project')
  .action(() => {
    console.log(chalk.blue('Initializing ProXimate...'));
    // TODO: create proximate.config.json or scaffold css imports
    console.log(chalk.green('ProXimate initialized successfully!'));
  });

program
  .command('list')
  .description('List all available animations')
  .action(() => {
    console.log(chalk.yellow('Available animations:'));
    console.log('- fade-in');
    console.log('- fade-in-up');
    console.log('- zoom-in');
    console.log('- pulse');
    // TODO: parse dynamically or use a static map
  });

program
  .command('add <animations...>')
  .description('Add specific animations to your custom build')
  .action((animations) => {
    console.log(chalk.blue(`Adding animations: ${animations.join(', ')}`));
    // TODO: copy css files or generate custom bundle
  });

program
  .command('build')
  .description('Build your custom ProXimate bundle')
  .action(() => {
    console.log(chalk.blue('Building custom animation bundle...'));
    // TODO: read config and bundle css
  });

program.parse(process.argv);
