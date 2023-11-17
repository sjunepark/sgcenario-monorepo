<script lang="ts">
	import { type InitialConfigType, LexicalComposer } from '@lexical-svelte/core';
	import { createSettingsStore, setSettingsStore } from '$lib/lexical/settings';

	const initialConfig: InitialConfigType = {
		namespace: 'sgcenario',
		onError: (error) => {
			console.error(error);
		}
	};

	setSettingsStore(createSettingsStore());
</script>

<LexicalComposer {initialConfig} />
