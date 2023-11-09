<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { scrollbarStyle } from '$lib/configs/configs.js';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
	import type { ComboboxProps } from '$lib/meltTypes.js';
	import type { Readable, Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	export let comboboxProps: {
		elements: {
			menu: ComboboxProps['elements']['menu'];
			option: ComboboxProps['elements']['option'];
		};
		helpers: {
			isSelected: ComboboxProps['helpers']['isSelected'];
		};
	};
	export let listOptions: Readable<string[]> | Writable<string[]>;

	const {
		elements: { menu, option },
		helpers: { isSelected }
	} = comboboxProps;
</script>

<ul
	{...$menu}
	use:menu
	class={twMerge(
		$listOptions.length > 0 ? 'outline' : '',
		'prose z-10 flex max-h-48 w-[15ch] flex-col overflow-hidden bg-white shadow-lg outline-1 outline-stone-500/50'
	)}
	transition:fly={{ duration: 150, y: -5 }}
>
	<OverlayScrollbarsComponent options={scrollbarStyle} defer>
		{#each $listOptions as value, i (i)}
			<!--suppress JSCheckFunctionSignatures -->
			<li
				{...$option({
					value: value,
					label: value
				})}
				use:option
				class="not-prose relative cursor-pointer scroll-my-2 whitespace-nowrap pl-2 data-[highlighted]:bg-stone-200/50 data-[highlighted]:font-semibold data-[disabled]:opacity-50"
				class:bg-stone-200={$isSelected(value)}
			>
				<span>{value}</span>
			</li>
		{/each}
	</OverlayScrollbarsComponent>
</ul>
