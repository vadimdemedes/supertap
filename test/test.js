import fs from 'fs';
import execa from 'execa';
import test from 'ava';

const exec = cmd => {
	return execa.shell(cmd)
		.catch(err => err)
		.then(result => result.stdout);
};

const reporters = [
	'tap-spec',
	'tap-dot',
	'tap-nyan',
	'tap-min',
	'faucet',
	'tap-summary',
	'tap-pessimist',
	'tap-json'
];

const fixtures = fs.readdirSync(`${__dirname}/fixtures`);

reporters.forEach(reporter => {
	fixtures.forEach(fixture => {
		const path = `${__dirname}/fixtures/${fixture}`;
		const name = fixture.replace('.js', '');

		test(`${reporter} - ${name}`, async t => {
			let stdout = await exec(`node ${path} | ${__dirname}/../node_modules/.bin/${reporter}`);

			// Strip duration from output, because it's dynamic and breaking snapshots
			if (reporter === 'tap-spec' || reporter === 'tap-summary' || reporter === 'tap-min') {
				stdout = stdout.replace(/([0-9]+)ms/g, '');
			}

			t.snapshot(stdout);
		});
	});
});
