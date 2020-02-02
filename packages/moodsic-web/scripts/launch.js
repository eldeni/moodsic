/* eslint-disable */
/* eslint-disable import/no-extraneous-dependencies */
const { argv } = require('yargs');
const { logger } = require('jege/server');

const babelRc = require('./.babelrc');
const { gulp } = require('./build');

const log = logger('[moodsic-web]');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

const server = require('../src/server/index.local').default;

function launch() {
  log('launcher(): argv: %j', argv);
  server();
}

if (require.main === module) {
  launch();
}
