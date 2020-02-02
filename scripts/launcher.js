const { argv } = require('yargs');
const { createLauncher, proc } = require('process-launch');
const { logger } = require('jege/server');

const launcherConfig = require('./launcherConfig');

const log = logger('[monorepo-moodsic-web]');

const processDefinitions = {
  moodsicDataGenerator: proc(
    'node',
    [
      './scripts/launch.js',
    ],
    {
      cwd: './packages/moodsic-data-generator',
      env: {
        GOOGLE_APPLICATION_CREDENTIALS: '~/.gcloud/key-1.json',
      },
      stdio: 'inherit',
    },
  ),
  moodsicWeb: proc(
    'node',
    [
      './scripts/launch.js',
    ],
    {
      cwd: './packages/moodsic-web',
      env: {
        FORM_WEB_PORT: launcherConfig.FORM_WEB_PORT,
      },
      stdio: 'inherit',
    },
  ),
  moodsicWebBackend: proc(
    'node',
    [
      './scripts/launch.js',
    ],
    {
      cwd: './packages/moodsic-web-backend',
      env: {
      },
      stdio: 'inherit',
    },
  ),
  spectrogramCreator: proc(
    'python3',
    [
      './app.py',
    ],
    {
      cwd: './packages/spectrogram-creator',
      stdio: 'inherit',
    },
  ),
};

const processGroupDefinitions = {
  default: [
    'moodsicWeb',
  ],
};

function launcher() {
  try {
    log(
      'launcher(): argv: %j, Processes defined: %j, ProcessGroupDefinitions: %j',
      argv,
      Object.keys(processDefinitions),
      processGroupDefinitions,
    );

    const Launcher = createLauncher({
      processDefinitions,
      processGroupDefinitions,
    });

    Launcher.run({
      process: argv.process,
    });
  } catch (err) {
    log('launcher(): error reading file', err);
  }
}

if (require.main === module) {
  launcher();
}
