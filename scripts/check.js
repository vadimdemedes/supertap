'use strict';
const fs = require('fs');
const waitForEnter = require('wait-for-enter');
const eachSeries = require('p-each-series');
const ctrlcExit = require('ctrlc-exit');
const execa = require('execa');
const path = require('path');

ctrlcExit();

const exec = async cmd => {
	const {stdout} = await execa.shell(cmd)
		.catch(error => error);

	return stdout;
};

const fixturePath = path.join(__dirname, '..', 'test', 'fixtures');

const fixtures = fs.readdirSync(fixturePath);
const reporter = process.argv[2];

eachSeries(fixtures, async fixture => {
	const reporterPath = path.join(__dirname, '..', 'node_modules', '.bin', reporter);
	const stdout = await exec(`node ${fixturePath} | ${reporterPath}`);
	console.log(fixture);
	console.log(stdout);

	return waitForEnter();
}).then(() => process.exit()); // eslint-disable-line unicorn/no-process-exit
