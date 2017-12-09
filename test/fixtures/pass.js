'use strict';
const supertap = require('../..');

console.log(supertap.start());

console.log(supertap.test('passing', {
	index: 1,
	passed: true
}));

console.log(supertap.finish({
	passed: 1
}));
