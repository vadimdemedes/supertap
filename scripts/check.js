'use strict';
const fs = require('fs');
const waitForEnter = require('wait-for-enter');
const eachSeries = require('p-each-series');
const ctrlcExit = require('ctrlc-exit');
const execa = require('execa');

ctrlcExit();

const exec = cmd => {
	return execa.shell(cmd)
		.catch(err => err)
		.then(result => result.stdout);
};

const fixtures = fs.readdirSync(`${__dirname}/../test/fixtures`);
const reporter = process.argv[2];

eachSeries(fixtures, async fixture => {
	const fixturePath = `${__dirname}/../test/fixtures/${fixture}`;
	const reporterPath = `${__dirname}/../node_modules/.bin/${reporter}`;
	const stdout = await exec(`node ${fixturePath} | ${reporterPath}`);
	console.log(fixture);
	console.log(stdout);

	return waitForEnter();
}).then(() => process.exit()); // eslint-disable-line unicorn/no-process-exit
