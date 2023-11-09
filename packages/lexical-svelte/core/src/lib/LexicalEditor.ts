import type { DOMConversionMap, DOMExportOutput, Klass, LexicalEditor, LexicalNode } from 'lexical';

export type LexicalNodeReplacement = {
	replace: Klass<LexicalNode>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	with: <T extends { new (...args: any): any }>(node: InstanceType<T>) => LexicalNode;
	withKlass?: Klass<LexicalNode>;
};

export type HTMLConfig = {
	export?: Map<Klass<LexicalNode>, (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput>;
	import?: DOMConversionMap;
};
