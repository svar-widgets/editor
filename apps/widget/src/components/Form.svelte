<script lang="ts">
	import { Locale } from "@svar-ui/svelte-core";
	import { en } from "@svar-ui/editor-locales";

	import Editor from "./FormEditor.svelte";
	import Values from "./Values.svelte";
	import type { IItemConfig, TValues, Snippet } from "../types.js";

	interface Props {
		values?: TValues;
		items?: IItemConfig[];
		css?: string;
		activeBatch?: string | null;
		focus?: boolean;
		autoSave?: boolean;
		readonly?: boolean;
		children?: Snippet;
		[key: string]: any;
	}

	// incoming parameters
	let {
		values = {},
		items = [],
		css = "",
		activeBatch = null,
		focus = false,
		autoSave = true,
		readonly = false,
		children,
		...restProps
	}: Props = $props();
</script>

<Locale words={en} optional={true}>
	<div class="wx-content">
		<Values
			view={Editor}
			{values}
			{items}
			{css}
			{focus}
			{activeBatch}
			{autoSave}
			{readonly}
			{...restProps}
		>
			{#if children}{@render children()}{/if}
		</Values>
	</div>
</Locale>

<style>
	.wx-content {
		height: 100%;
		overflow-y: auto;
	}
</style>
