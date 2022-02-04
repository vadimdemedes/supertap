import * as supertap from '../../dist/index.js';

console.log(supertap.start());

console.log(
	supertap.test('skip', {
		index: 1,
		skip: true,
	}),
);

console.log(
	supertap.finish({
		skipped: 1,
	}),
);
