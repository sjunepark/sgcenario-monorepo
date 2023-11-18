<script lang="ts">
	import {
		ContentEditable,
		type InitialConfigType,
		LexicalComposer,
		PlainTextPlugin
	} from '@lexical-svelte/core';
	import { createSettingsStore, setSettingsStore } from '$lib/lexical/settings';

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
		<ContentEditable slot="contentEditable" class="w-[1280px] h-[1080px] ring-1" />
	</PlainTextPlugin>
</LexicalComposer>
