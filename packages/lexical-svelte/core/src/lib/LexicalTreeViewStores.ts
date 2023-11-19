import { writable } from 'svelte/store';
import type { LexicalCommand } from 'lexical';

export type LoggedCommand = LexicalCommand<unknown> & { payload: unknown };
export type LoggedCommands = ReadonlyArray<LoggedCommand>;
export const createLoggedCommands = () => {
	const { subscribe, update } = writable<LoggedCommands>([]);
	const add = (loggedCommand: LoggedCommand) => {
		const { type, payload } = loggedCommand;
		console.log('Store adding');
		update((before) => {
			console.log('Store updating');
			let after = [...before];
			after.push({
				payload,
				type: type ?? 'UNKNOWN'
			});
			if (after.length > 10) {
				after.shift();
			}
			return after;
		});
	};

	return { subscribe, add };
};
