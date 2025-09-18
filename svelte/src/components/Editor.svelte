<script>
	import { Locale } from "@svar-ui/svelte-core";
	import en from "../en.js";

	import Layout from "./Layout.svelte";
	import Values from "./Values.svelte";

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
	} = $props();
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
