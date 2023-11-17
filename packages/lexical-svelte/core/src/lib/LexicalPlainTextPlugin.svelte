<script lang="ts">
	import { getLexicalComposerContext } from '$lib/LexicalComposerContext';
	import { mergeRegister } from '@lexical/utils';
	import { registerPlainText } from '@lexical/plain-text';
	import { registerDragonSupport } from '@lexical/dragon';

	const [editor] = getLexicalComposerContext();
	$: mergeRegister(registerPlainText(editor), registerDragonSupport(editor));
</script>

<slot name="contentEditable" />
<!--enhance: implement options to show/hide placeholder. Check lexical-playground -->
<slot name="placeholder" />
