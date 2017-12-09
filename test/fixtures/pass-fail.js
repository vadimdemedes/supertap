'use strict';
const supertap = require('../..');

console.log(supertap.start());

console.log(supertap.test('passing', {
	index: 1,
	passed: true
}));

const err = new Error('error');
err.stack = 'error\n  at fn (test.js:1:2)';
err.actual = 1;
err.expected = 2;
err.operator = '===';

console.log(supertap.test('fail', {
	index: 2,
	passed: false,
	error: err
}));

console.log(supertap.finish({
	passed: 1,
	failed: 1
}));
