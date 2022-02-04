import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import waitForEnter from 'wait-for-enter';
import eachSeries from 'p-each-series';
import ctrlcExit from 'ctrlc-exit';
import {execaCommand} from 'execa';

ctrlcExit();

const exec = async cmd => {
	const {stdout} = await execaCommand(cmd, {reject: false, shell: true});
	return stdout;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, '..', 'test', 'fixtures');

const fixtures = fs.readdirSync(fixturePath);
const reporter = process.argv[2];

eachSeries(fixtures, async fixture => {
	const reporterPath = path.join(
		__dirname,
		'..',
		'node_modules',
		'.bin',
		reporter,
	);
	const stdout = await exec(`node ${fixturePath}/${fixture} | ${reporterPath}`);
	console.log(fixture);
	console.log(stdout);

	return waitForEnter();
}).then(() => process.exit()); // eslint-disable-line unicorn/no-process-exit
