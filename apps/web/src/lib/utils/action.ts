import type { Action } from 'svelte/action';

export const autofocus: Action = (node) => {
	// On mount
	node.focus();
	const moveCaretToEnd = () => {
		const range = document.createRange();
		range.selectNodeContents(node);
		range.collapse(false); // Collapse the range to the end point. false means collapse to end rather than the start

		const selection = window.getSelection();
		if (selection) {
			selection.removeAllRanges();
			selection.addRange(range);
		}
	};
	moveCaretToEnd();

	// On focus
	node.addEventListener('focus', moveCaretToEnd);

	return {};
};
