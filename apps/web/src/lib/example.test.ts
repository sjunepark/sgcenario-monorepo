import { test, expect } from 'vitest';
const subtract = (a: number, b: number) => a - b;

test('subtract', () => {
	expect(subtract(2, 1)).toBe(1);
});
