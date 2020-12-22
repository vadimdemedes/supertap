'use strict';

const {serializeError} = require('serialize-error');
const indentString = require('indent-string');
const stripAnsi = require('strip-ansi');
const arrify = require('arrify');
const yaml = require('js-yaml');
const os = require('os');

const serializeErrorForTap = err => {
	const object = serializeError(err);
	object.at = object.stack
		.split('\n')
		.slice(1, 2)
		.map(line => line.replace(/at/, '').trim())
		.shift();
	delete object.stack;
	return object;
};

exports.start = () => 'TAP version 13';

exports.test = (title, options) => {
	const {error} = options;
	let {passed} = options;
	let directive = '';

	if (!error) {
		if (options.todo) {
			directive = '# TODO';
			passed = false;
		} else if (options.skip) {
			directive = '# SKIP';
			passed = true;
		}
	}

	const comment = arrify(options.comment)
		.map(line => indentString(line, 4).replace(/^ {4}/gm, '#   '))
		.join(os.EOL);

	const output = [
		`${passed ? 'ok' : 'not ok'} ${options.index} - ${stripAnsi(title)} ${directive}`.trim(),
		comment
	];

	if (error) {
		const object = error instanceof Error ? serializeErrorForTap(error) : error;

		output.push([
			'  ---',
			indentString(yaml.safeDump(object).trim(), 4),
			'  ...'
		].join(os.EOL));
	}

	return output.filter(Boolean).join(os.EOL);
};

exports.finish = stats => {
	stats = stats || {};

	const passed = stats.passed || 0;
	const failed = stats.failed || 0;
	const skipped = stats.skipped || 0;
	const todo = stats.todo || 0;
	const crashed = stats.crashed || 0;

	return [
		`\n1..${passed + failed + skipped + todo}`,
		`# tests ${passed + failed + skipped}`,
		`# pass ${passed}`,
		skipped > 0 ? `# skip ${skipped}` : null,
		`# fail ${failed + crashed + todo}${os.EOL}`
	].filter(Boolean).join(os.EOL);
};
