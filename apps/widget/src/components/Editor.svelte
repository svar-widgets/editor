<script lang="ts">
	import { Locale } from "@svar-ui/svelte-core";
	import { en } from "@svar-ui/editor-locales";

	import Layout from "./Layout.svelte";
	import Values from "./Values.svelte";
	import type { IItemConfig, TValues, TBar, Snippet } from "../types.js";

	interface Props {
		values?: TValues;
		items?: IItemConfig[];
		css?: string;
		activeBatch?: string | null;
		topBar?: TBar;
		bottomBar?: TBar;
		focus?: boolean;
		autoSave?: boolean;
		layout?: string;
		readonly?: boolean;
		placement?: string;
		children?: Snippet;
		[key: string]: any;
	}

	// incoming parameters
	let {
		values = {},
		items = [],
		css = "",
		activeBatch = null,
		topBar = true,
		bottomBar = true,
		focus = false,
		autoSave = false,
		layout = "default",
		readonly = false,
		placement = "inline",
		children,
		...restProps
	}: Props = $props();
</script>

<Locale words={en} optional={true}>
	<Values
		view={Layout}
		{values}
		{items}
		{css}
		{activeBatch}
		{topBar}
		{bottomBar}
		{focus}
		{autoSave}
		{layout}
		{readonly}
		{placement}
		{...restProps}
	>
		{#if children}{@render children()}{/if}
	</Values>
</Locale>
