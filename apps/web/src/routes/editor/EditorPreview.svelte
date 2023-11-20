<script lang="ts">
	import { getLexicalComposerContext } from '@lexical-svelte/core';
	import { onDestroy, onMount } from 'svelte';

	const [editor] = getLexicalComposerContext();
	console.log({ editor });
	let removeUpdateListener = () => {};
	onMount(() => {
		removeUpdateListener = editor.registerUpdateListener(({ editorState, tags }) => {
			console.log({ editorState });
			console.log({ tags });
		});
	});
	onDestroy(removeUpdateListener);
</script>

<slot />
<button
	on:click={() => {
		console.log({ editor });
	}}>View Editor</button
>
