#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { generateTheme, watchTheme } = require('./dist/index');

const argv = yargs(hideBin(process.argv))
  .option('js', {
    describe: 'Generate only the JavaScript file',
    type: 'boolean',
  })
  .option('css', {
    describe: 'Generate only the css file',
    type: 'boolean',
  }).argv;

const options = {
  js: argv.js || false,
  css: argv.css || false,
};

if (argv._[0] === 'build') {
  generateTheme(options);
} else if (argv._[0] === 'watch') {
  watchTheme(options);
}
