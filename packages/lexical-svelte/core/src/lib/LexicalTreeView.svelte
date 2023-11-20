<script lang="ts">
	import type { EditorState, LexicalEditor } from 'lexical';
	import { COMMAND_PRIORITY_HIGH } from 'lexical';
	import { generateContent } from '$lib/LexicalTreeView';
	import { mergeRegister } from '@lexical/utils';
	import { onDestroy, onMount } from 'svelte';
	import { createLoggedCommands } from '$lib/LexicalTreeViewStores';

	export let treeTypeButtonClassName: string;
	export let timeTravelButtonClassName: string;
	export let timeTravelPanelSliderClassName: string;

	export let timeTravelPanelButtonClassName: string;
	export let viewClassName: string;
	export let timeTravelPanelClassName: string;
	export let editor: LexicalEditor;

	let timeStampedEditorStates: Array<[number, EditorState]> = [];
	let content = '';
	let timeTravelEnabled = false;
	let showExportDOM = false;
	let playingIndexRef = 0;
	let treeElementRef: HTMLPreElement | null = null;
	let inputRef: HTMLInputElement | null = null;
	let isPlaying = false;
	let isLimited = false;
	let showLimited = false;
	let lastEditorStateRef: null | EditorState = null;

	// Track registered commands and add listener to modify loggedCommands
	const unregisterCommandListeners = new Set<() => void>();
	const commandsLog = createLoggedCommands();
	onMount(() => {
		for (const [command] of editor._commands) {
			unregisterCommandListeners.add(
				editor.registerCommand(
					command,
					(payload) => {
						commandsLog.add({ ...command, payload });
						return false;
					},
					COMMAND_PRIORITY_HIGH
				)
			);
		}
	});
	onDestroy(() => unregisterCommandListeners.forEach((unregister) => unregister()));

	let generateTree: (editorState: EditorState) => void;
	$: generateTree = (editorState) => {
		content = generateContent(editor, $commandsLog, showExportDOM);

		if (!timeTravelEnabled) {
			timeStampedEditorStates = [...timeStampedEditorStates, [Date.now(), editorState]];
		}
	};

	$: {
		const editorState = editor.getEditorState();

		if (!showLimited && editorState._nodeMap.size < 1000) {
			content = generateContent(editor, $commandsLog, showExportDOM);
		}
	}

	let mergedRegister = () => {};
	onMount(() => {
		mergedRegister = mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				if (!showLimited && editorState._nodeMap.size > 1000) {
					lastEditorStateRef = editorState;
					isLimited = true;
					if (!showLimited) {
						return;
					}
				}
				generateTree(editorState);
			}),
			editor.registerEditableListener(() => {
				content = generateContent(editor, $commandsLog, showExportDOM);
			})
		);
	});
	onDestroy(mergedRegister);

	const totalEditorStates = timeStampedEditorStates.length;

	let clearTimeoutId = () => {};
	$: {
		clearTimeoutId();
		if (isPlaying) {
			let timeoutId: ReturnType<typeof setTimeout>;

			const play = () => {
				const currentIndex = playingIndexRef;

				if (currentIndex === totalEditorStates - 1) {
					isPlaying = false;
					return;
				}

				const currentTime = timeStampedEditorStates[currentIndex][0];
				const nextTime = timeStampedEditorStates[currentIndex + 1][0];
				const timeDiff = nextTime - currentTime;
				timeoutId = setTimeout(() => {
					playingIndexRef++;
					const index = playingIndexRef;
					const input = inputRef;

					if (input !== null) {
						input.value = String(index);
					}

					editor.setEditorState(timeStampedEditorStates[index][1]);
					play();
				}, timeDiff);
			};

			play();

			clearTimeoutId = () => {
				clearTimeout(timeoutId);
			};
		}
	}

	let resetLexicalEditor: (() => void) | undefined;
	$: {
		if (resetLexicalEditor) {
			resetLexicalEditor();
		}
		const useEffect = () => {
			const element = treeElementRef;

			if (element !== null) {
				// @ts-expect-error Internal field
				element.__lexicalEditor = editor;

				return () => {
					// @ts-expect-error Internal field
					element.__lexicalEditor = null;
				};
			}
		};
		resetLexicalEditor = useEffect();
	}
</script>

<p>$commandsLog: {$commandsLog}</p>
<div class={viewClassName}>
	{#if !showLimited && isLimited}
		<div style="padding: 1.25rem">
			<span style="margin-right: 1.25rem">
				Detected large EditorState, this can impact debugging performance.
			</span>
			<button
				on:click={() => {
					showLimited = true;
					const editorState = lastEditorStateRef;
					if (editorState !== null) {
						lastEditorStateRef = null;
						generateTree(editorState);
					}
				}}
				style="
				background: transparent;
				border: 1px solid white;
				color: white;
				cursor: pointer;
				padding: 5
				"
			>
				Show full tree
			</button>
		</div>
	{/if}
	{#if !showLimited}
		<button
			on:click={() => {
				showExportDOM = !showExportDOM;
			}}
			class={treeTypeButtonClassName}
			type="button"
		>
			{showExportDOM ? 'Tree' : 'Export DOM'}
		</button>
	{/if}
	{#if !timeTravelEnabled && (showLimited || !isLimited) && totalEditorStates > 2}
		<button
			on:click={() => {
				const rootElement = editor.getRootElement();

				if (rootElement !== null) {
					rootElement.contentEditable = 'false';
					playingIndexRef = totalEditorStates - 1;
					timeTravelEnabled = true;
				}
			}}
			class={timeTravelButtonClassName}
			type="button"
		>
			Time Travel
		</button>
	{/if}
	{#if showLimited || !isLimited}
		<pre bind:this={treeElementRef}>{content}</pre>
	{/if}
	{#if timeTravelEnabled && (showLimited || !isLimited)}
		<div class={timeTravelPanelClassName}>
			<button
				class={timeTravelPanelButtonClassName}
				on:click={() => {
					if (playingIndexRef === totalEditorStates - 1) {
						playingIndexRef = 1;
					}
					isPlaying = !isPlaying;
				}}
				type="button"
			>
				{isPlaying ? 'Pause' : 'Play'}
			</button>
			<input
				class={timeTravelPanelSliderClassName}
				bind:this={inputRef}
				on:change={(event) => {
					const editorStateIndex = Number(event.currentTarget.value);
					const timeStampedEditorState = timeStampedEditorStates[editorStateIndex];

					if (timeStampedEditorState) {
						playingIndexRef = editorStateIndex;
						editor.setEditorState(timeStampedEditorState[1]);
					}
				}}
				type="range"
				min="1"
				max={totalEditorStates - 1}
			/>
			<button
				class={timeTravelPanelButtonClassName}
				on:click={() => {
					const rootElement = editor.getRootElement();

					if (rootElement !== null) {
						rootElement.contentEditable = 'true';
						const index = timeStampedEditorStates.length - 1;
						const timeStampedEditorState = timeStampedEditorStates[index];
						editor.setEditorState(timeStampedEditorState[1]);
						const input = inputRef;

						if (input !== null) {
							input.value = String(index);
						}

						timeTravelEnabled = false;
						isPlaying = false;
					}
				}}
				type="button"
			>
				Exit
			</button>
		</div>
	{/if}
</div>
