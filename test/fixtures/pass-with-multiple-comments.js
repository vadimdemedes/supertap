import * as supertap from '../../dist/index.js';

console.log(supertap.start());

console.log(
	supertap.test('pass with comment', {
		index: 1,
		passed: true,
		comment: ['Hello', 'Bonjour'],
	}),
);

console.log(
	supertap.finish({
		passed: 1,
	}),
);
