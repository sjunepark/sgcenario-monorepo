<script lang="ts">
	import { getLexicalComposerContext } from '@lexical-svelte/core';
	import { TreeView } from '@lexical-svelte/core';

	const [editor] = getLexicalComposerContext();
</script>

<TreeView
	viewClassName="tree-view-output"
	treeTypeButtonClassName="debug-treetype-button"
	timeTravelPanelClassName="debug-timetravel-panel"
	timeTravelButtonClassName="debug-timetravel-button"
	timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
	timeTravelPanelButtonClassName="debug-timetravel-panel-button"
	{editor}
/>
