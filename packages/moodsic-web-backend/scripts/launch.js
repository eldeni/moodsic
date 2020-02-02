/* eslint-disable */
/* eslint-disable import/no-extraneous-dependencies */
const { argv } = require('yargs');
const { logger } = require('jege/server');

const babelRc = require('./.babelrc');
const { gulp } = require('./build');

const log = logger('[moodsic-web-backend]');

const app = require('../src/app');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

function launch() {
  log('launcher(): argv: %j', argv);
  app();
}

if (require.main === module) {
  launch();
}
