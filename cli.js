#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { generateTheme, watchTheme } = require('./dist/index.js');

const argv = yargs(hideBin(process.argv)).argv;

if (argv._[0] === 'build') {
  generateTheme();
} else if (argv._[0] === 'watch') {
  watchTheme();
}
