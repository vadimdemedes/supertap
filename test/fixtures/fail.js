'use strict';
const supertap = require('../..');

console.log(supertap.start());

const err = new Error('error');
err.stack = 'error\n  at fn (test.js:1:2)';
err.actual = 1;
err.expected = 2;
err.operator = '===';

console.log(supertap.test('fail', {
	index: 1,
	passed: false,
	error: err
}));

console.log(supertap.finish({
	passed: 0,
	failed: 1
}));
