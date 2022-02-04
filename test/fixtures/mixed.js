import * as supertap from '../../dist/index.js';

console.log(supertap.start());

console.log(
	supertap.test('passing', {
		index: 1,
		passed: true,
	}),
);

const error = new Error('error');
error.stack = 'error\n  at fn (test.js:1:2)';
error.actual = 1;
error.expected = 2;
error.operator = '===';

console.log(
	supertap.test('fail', {
		index: 2,
		passed: false,
		error,
	}),
);

console.log(
	supertap.test('pass with comment', {
		index: 3,
		passed: true,
		comment: 'Hello',
	}),
);

console.log(
	supertap.test('pass with comment', {
		index: 4,
		passed: true,
		comment: ['Hello', 'Bonjour'],
	}),
);

console.log(
	supertap.test('skip', {
		index: 5,
		skip: true,
	}),
);

console.log(
	supertap.test('todo', {
		index: 6,
		todo: true,
	}),
);

console.log(
	supertap.finish({
		passed: 3,
		failed: 1,
		skipped: 1,
		todo: 1,
	}),
);
