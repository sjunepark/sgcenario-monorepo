import type { EditorState, EditorThemeClasses, Klass, LexicalEditor, LexicalNode } from 'lexical';
import { $createParagraphNode, $getRoot, $getSelection } from 'lexical';
import type { HTMLConfig, LexicalNodeReplacement } from './LexicalEditor';
import { CAN_USE_DOM } from '@lexical-svelte/shared';

export type InitialConfigType = Readonly<{
	editor__DEPRECATED?: LexicalEditor | null;
	namespace: string;
	nodes?: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement>;
	onError: (error: Error, editor: LexicalEditor) => void;
	editable?: boolean;
	theme?: EditorThemeClasses;
	editorState?: InitialEditorStateType;
	html?: HTMLConfig;
}>;

export type InitialEditorStateType =
	| null
	| string
	| EditorState
	| ((editor: LexicalEditor) => void);

const HISTORY_MERGE_OPTIONS = { tag: 'history-merge' };

export function initializeEditor(
	editor: LexicalEditor,
	initialEditorState?: InitialEditorStateType
): void {
	if (initialEditorState === null) {
		return;
	} else if (initialEditorState === undefined) {
		editor.update(() => {
			const root = $getRoot();
			if (root.isEmpty()) {
				const paragraph = $createParagraphNode();
				root.append(paragraph);
				const activeElement = CAN_USE_DOM ? document.activeElement : null;
				if (
					$getSelection() !== null ||
					(activeElement !== null && activeElement === editor.getRootElement())
				) {
					paragraph.select();
				}
			}
		}, HISTORY_MERGE_OPTIONS);
	} else {
		switch (typeof initialEditorState) {
			case 'string': {
				const parsedEditorState = editor.parseEditorState(initialEditorState);
				editor.setEditorState(parsedEditorState, HISTORY_MERGE_OPTIONS);
				break;
			}
			case 'object': {
				editor.setEditorState(initialEditorState, HISTORY_MERGE_OPTIONS);
				break;
			}
			case 'function': {
				editor.update(() => {
					const root = $getRoot();
					if (root.isEmpty()) {
						initialEditorState(editor);
					}
				}, HISTORY_MERGE_OPTIONS);
				break;
			}
		}
	}
}
