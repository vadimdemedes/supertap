'use strict';
const supertap = require('../..');

console.log(supertap.start());

console.log(supertap.test('skip', {
	index: 1,
	skip: true
}));

console.log(supertap.finish({
	skipped: 1
}));
