import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Sample from '$lib/__tests__/unit/Todo.svelte';

describe('Todo', () => {
	test('shows the todo text when rendered', () => {
		render(Sample);

		expect(screen.getByText('Todo')).toBeInTheDocument();
	});
});
