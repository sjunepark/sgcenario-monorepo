import { type Writable, writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';

type SettingName = 'emptyEditor';

type Settings = Record<SettingName, boolean>;

const DEFAULT_SETTINGS: Settings = {
	emptyEditor: true
};

type SettingsStore = {
	subscribe: Writable<Settings>['subscribe'];
	setOption: (name: SettingName, value: boolean) => void;
};
export const createSettingsStore: () => SettingsStore = () => {
	const { subscribe, update } = writable<Settings>(DEFAULT_SETTINGS);

	const setOption = (name: SettingName, value: boolean) => {
		update((settings) => ({
			...settings,
			[name]: value
		}));
	};

	return {
		subscribe,
		setOption
	};
};

export const setSettingsStore = (settings: SettingsStore) => {
	setContext<SettingsStore>('settings', settings);
};

export const getSettingsStore = () => {
	return getContext<SettingsStore>('settings');
};
