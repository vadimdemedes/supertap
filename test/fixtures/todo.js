import * as supertap from '../../dist/index.js';

console.log(supertap.start());

console.log(
	supertap.test('todo', {
		index: 1,
		todo: true,
	}),
);

console.log(
	supertap.finish({
		todo: 1,
	}),
);
