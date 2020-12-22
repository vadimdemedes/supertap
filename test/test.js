const fs = require('fs');
const execa = require('execa');
const test = require('ava');
const path = require('path');

const exec = async cmd => {
	const {stdout} = await execa.command(cmd, {reject: false, shell: true})
	return stdout;
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

const fixtures = fs.readdirSync(path.join(__dirname, 'fixtures'));

reporters.forEach(reporter => {
	fixtures.forEach(fixture => {
		const fixturePath = path.join(__dirname, 'fixtures', fixture);
		const name = fixture.replace('.js', '');

		test(`${reporter} - ${name}`, async t => {
			const reporterBinPath = path.join(__dirname, '..', 'node_modules', '.bin', reporter);
			let stdout = await exec(`node ${fixturePath} | ${reporterBinPath}`);

			// Strip duration from output, because it's dynamic and breaking snapshots
			if (reporter === 'tap-spec' || reporter === 'tap-summary' || reporter === 'tap-min') {
				stdout = stdout.replace(/(\d+)ms/g, '');
			}

			t.snapshot(stdout);
		});
	});
});
