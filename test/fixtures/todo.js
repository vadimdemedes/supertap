'use strict';
const supertap = require('../..');

console.log(supertap.start());

console.log(supertap.test('todo', {
	index: 1,
	todo: true
}));

console.log(supertap.finish({
	todo: 1
}));
