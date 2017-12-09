'use strict';
const supertap = require('../..');

console.log(supertap.start());

console.log(supertap.test('fail', {
	index: 1,
	passed: false
}));

console.log(supertap.finish({
	passed: 0,
	failed: 1
}));
