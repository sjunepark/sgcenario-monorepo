import { compile, preprocess } from 'svelte/compiler';
import sveltePreprocess from 'svelte-preprocess';
import { promises as fs } from 'fs';
import path from 'path';
import ts from 'typescript';

const input = '../src/lib/LexicalTreeView.svelte'; // Replace with your Svelte file name
const dirname = path.dirname(new URL(import.meta.url).pathname);
const absoluteInput = path.resolve(dirname, input);
const output = './compiled.js'; // Output file
const absoluteOutput = path.resolve(dirname, output);

async function compileSvelte() {
	try {
		let component = await fs.readFile(absoluteInput, 'utf-8');

		// Manually handle the $lib alias, if necessary
		// Replace '$lib' with the correct path relative to `absoluteInput`
		component = component.replace(/\$lib/g, '../src/lib');

		// Read TypeScript configuration
		const tsConfig = ts.readConfigFile('../tsconfig.json', ts.sys.readFile);

		// Preprocess with TypeScript support and tsconfig options
		const preprocessed = await preprocess(
			component,
			sveltePreprocess({
				typescript: {
					// Pass the tsconfig compilerOptions here
					compilerOptions: tsConfig.config.compilerOptions
				}
			}),
			{ filename: absoluteInput }
		);

		// Compile the preprocessed component
		const compiled = compile(preprocessed.code, {
			filename: absoluteInput
			// Other compile options as needed
		});

		await fs.writeFile(absoluteOutput, compiled.js.code);
		console.log(`Component compiled successfully to ${absoluteOutput}`);
	} catch (error) {
		console.error('Error compiling component:', error);
	}
}

compileSvelte();
