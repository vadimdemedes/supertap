import {serializeError} from 'serialize-error';
import indentString = require('indent-string');
import stripAnsi = require('strip-ansi');
import * as yaml from 'js-yaml';

const serializeErrorForTap = (err: Error) => {
	const object = serializeError(err);
	object['at'] = (object.stack ?? '')
		.split('\n')
		.slice(1, 2)
		.map((line: string) => line.replace(/at/, '').trim())
		.shift();
	delete object.stack;
	return object;
};

export const start = () => 'TAP version 13';

interface Options {
	index: number;
	passed?: boolean;
	error?: Error | Record<string, unknown>;
	todo?: boolean;
	skip?: boolean;
	comment: string | string[];
}

export const test = (title: string, options: Options): string => {
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

	let comment = '';

	if (options.comment) {
		comment = (Array.isArray(options.comment) ? options.comment : [options.comment])
			.map(line => indentString(line, 4).replace(/^ {4}/gm, '#   '))
			.join('\n');
	}

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
		].join('\n'));
	}

	return output.filter(Boolean).join('\n');
};

interface Stats {
	passed?: number;
	failed?: number;
	skipped?: number;
	todo?: number;
	crashed?: number;
}

export const finish = (stats: Stats): string => {
	stats = stats ?? {};

	const passed = stats.passed ?? 0;
	const failed = stats.failed ?? 0;
	const skipped = stats.skipped ?? 0;
	const todo = stats.todo ?? 0;
	const crashed = stats.crashed ?? 0;

	return [
		`\n1..${passed + failed + skipped + todo}`,
		`# tests ${passed + failed + skipped}`,
		`# pass ${passed}`,
		skipped > 0 ? `# skip ${skipped}` : null,
		`# fail ${failed + crashed + todo}\n`
	].filter(Boolean).join('\n');
};
