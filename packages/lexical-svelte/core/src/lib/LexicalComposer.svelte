<script lang="ts">
	import type { InitialConfigType } from '$lib/LexicalComposer';
	import { initializeEditor } from '$lib/LexicalComposer';
	import {
		createLexicalComposerContext,
		type LexicalComposerContextType,
		setLexicalComposerContext
	} from '$lib/LexicalComposerContext';
	import { createEditor } from 'lexical';
	import { onMount } from 'svelte';

	export let initialConfig: InitialConfigType;

	const {
		theme,
		namespace,
		editor__DEPRECATED: initialEditor,
		nodes,
		onError,
		editorState: initialEditorState
	} = initialConfig;

	const context: LexicalComposerContextType = createLexicalComposerContext(null, theme);

	let editor = initialEditor || null;
	if (editor === null) {
		const newEditor = createEditor({
			editable: initialConfig.editable,
			namespace,
			nodes,
			onError: (error) => onError(error, newEditor),
			theme
		});
		initializeEditor(newEditor, initialEditorState);

		editor = newEditor;
	}

	setLexicalComposerContext([editor, context]);

	onMount(() => {
		const isEditable = initialConfig.editable;
		if (editor) {
			editor.setEditable(isEditable !== undefined ? isEditable : true);
		}
	});
</script>

<slot />
