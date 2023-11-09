// Without this handler, raw html or contents could be pasted

// from sveltejs/svelte
export function listen<K extends keyof HTMLElementEventMap>(
	node: HTMLElement,
	type: K,
	listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
	options?: boolean | AddEventListenerOptions
): () => void {
	node.addEventListener(type, listener, options);
	return () => node.removeEventListener(type, listener, options);
}

export function handlePaste(event: ClipboardEvent) {
	const targetElement = event.target;
	if (!(targetElement instanceof HTMLElement)) return;
	const selection = window.getSelection();
	if (!selection) return;
	const clipboardData = event.clipboardData;
	if (!clipboardData) return;

	const mimeTypes = clipboardData.types;

	let textToPaste: string | undefined;

	if (mimeTypes.includes('text/plain')) {
		textToPaste = clipboardData.getData('text/plain');
		event.preventDefault();
	} else if (mimeTypes.includes('text/html')) {
		textToPaste = clipboardData.getData('text/html');
		event.preventDefault();
	} else if (mimeTypes.includes('application/x-moz-file') || mimeTypes.includes('Files')) {
		const items = clipboardData.items;
		const textsToPaste: string[] = [];
		for (let i = 0; i < items.length; i++) {
			if (items[i].kind === 'file') {
				const file = items[i].getAsFile();
				if (file) {
					textsToPaste.push(file.name);
					event.preventDefault();
				}
			}
		}
		textToPaste = textsToPaste.join(', ');
	} else {
		alert('붙여 넣을 수 없는 형식입니다.');
		return;
	}

	targetElement.innerText += textToPaste;

	const range = document.createRange();
	range.selectNodeContents(targetElement);
	range.collapse(false);
	selection.removeAllRanges();
	selection.addRange(range);
}
