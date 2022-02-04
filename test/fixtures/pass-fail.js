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
	supertap.finish({
		passed: 1,
		failed: 1,
	}),
);
