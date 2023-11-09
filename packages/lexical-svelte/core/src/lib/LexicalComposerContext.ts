import type { EditorThemeClasses, LexicalEditor } from 'lexical';
import { getContext, setContext } from 'svelte';

export type LexicalComposerContextType = {
	getTheme: () => EditorThemeClasses | null | undefined;
};

export type LexicalComposerContextWithEditor = [LexicalEditor, LexicalComposerContextType];

export function createLexicalComposerContext(
	parent: LexicalComposerContextWithEditor | null | undefined,
	theme: EditorThemeClasses | null | undefined
): LexicalComposerContextType {
	let parentContext: LexicalComposerContextType | null = null;

	if (parent != null) {
		parentContext = parent[1];
	}

	function getTheme() {
		if (theme != null) {
			return theme;
		}

		return parentContext != null ? parentContext.getTheme() : null;
	}

	return {
		getTheme
	};
}

export const setLexicalComposerContext = (
	lexicalComposerContext: LexicalComposerContextWithEditor
) => {
	setContext<LexicalComposerContextWithEditor>('lexicalComposerContext', lexicalComposerContext);
};

export const getLexicalComposerContext = () => {
	return getContext<LexicalComposerContextWithEditor>('lexicalComposerContext');
};
