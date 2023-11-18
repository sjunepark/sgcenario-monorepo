<script lang="ts">
	import type { LexicalCommand, LexicalEditor } from 'lexical';
	import { createLoggedCommandsStore, useLexicalCommandsLog } from '$lib/LexicalTreeViewStore';
	import { COMMAND_PRIORITY_HIGH } from 'lexical';

	export let editor: LexicalEditor;
	const commandsLog = useLexicalCommandsLog(editor);
</script>
