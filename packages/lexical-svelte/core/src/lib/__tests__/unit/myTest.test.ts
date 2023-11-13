import { test, expect } from 'vitest';
const add = (a: number, b: number) => a + b;

// test simple add function
test('add', () => {
	expect(add(1, 2)).toBe(3);
});
