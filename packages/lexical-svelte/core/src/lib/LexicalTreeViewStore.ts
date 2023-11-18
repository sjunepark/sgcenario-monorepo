import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { LexicalCommand } from 'lexical';
import { COMMAND_PRIORITY_HIGH, type LexicalEditor } from 'lexical';

type LoggedCommand = LexicalCommand<unknown> & { payload: unknown };
type LoggedCommands = ReadonlyArray<LoggedCommand>;

type LoggedCommandsStore = (initialValue: LoggedCommands) => {
	subscribe: Writable<LoggedCommands>['subscribe'];
	push: (loggedCommand: LoggedCommand) => boolean;
};

export const createLoggedCommandsStore: LoggedCommandsStore = (initialValue: LoggedCommands) => {
	const { subscribe, update } = writable<LoggedCommands>(initialValue);

	const push = (loggedCommand: LoggedCommand) => {
		update((before) => {
			const after = before.concat(loggedCommand);
			if (after.length > 10) {
				after.shift();
			}
			return after;
		});
		return true;
	};

	return {
		subscribe,
		push
	};
};

const loggedCommandsStore = createLoggedCommandsStore([]);
export const useLexicalCommandsLog: (
	editor: LexicalEditor
) => ReadonlyArray<LexicalCommand<unknown> & { payload: unknown }> = (editor) => {
	const unregisterCommandListeners = new Set<() => void>();

	for (const [command] of editor._commands) {
		unregisterCommandListeners.add(
			editor.registerCommand(
				command,
				(payload) => {
					loggedCommandsStore.push({
						payload,
						type: command.type ? command.type : 'UNKNOWN'
					});
					return false;
				},
				COMMAND_PRIORITY_HIGH
			)
		);
	}
	return unregisterCommandListeners.forEach((unregister) => unregister());
};
