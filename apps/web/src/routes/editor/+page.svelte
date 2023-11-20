<script lang="ts">
	import {
		ContentEditable,
		type InitialConfigType,
		LexicalComposer,
		PlainTextPlugin
	} from '@lexical-svelte/core';
	import { createSettingsStore, setSettingsStore } from '$lib/lexical/settings';
	import { TreeViewPlugin } from '@lexical-svelte/playground';
	import EditorPreview from './EditorPreview.svelte';
	import { getLexicalComposerContext } from '@lexical-svelte/core';

	const initialConfig: InitialConfigType = {
		namespace: 'sgcenario',
		onError: (error) => {
			console.error(error);
		}
	};

	setSettingsStore(createSettingsStore());
</script>

<LexicalComposer {initialConfig}>
	<PlainTextPlugin>
		<ContentEditable slot="contentEditable" class="w-[640px] h-[160px] ring-1" />
	</PlainTextPlugin>
	<TreeViewPlugin />
	<EditorPreview />
</LexicalComposer>
