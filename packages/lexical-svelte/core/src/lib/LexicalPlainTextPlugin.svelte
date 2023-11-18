<script lang="ts">
	import { getLexicalComposerContext } from '$lib/LexicalComposerContext';
	import { mergeRegister } from '@lexical/utils';
	import { registerPlainText } from '@lexical/plain-text';
	import { registerDragonSupport } from '@lexical/dragon';
	import { onDestroy, onMount } from 'svelte';

	const [editor] = getLexicalComposerContext();
	let cleanup: () => void = () => {};

	onMount(() => {
		cleanup = mergeRegister(registerPlainText(editor), registerDragonSupport(editor));
	});
	onDestroy(() => {
		cleanup();
	});
</script>

<slot name="contentEditable" />
<!--enhance: implement options to show/hide placeholder. Check lexical-playground -->
<slot name="placeholder" />
