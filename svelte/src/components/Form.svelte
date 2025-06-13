<script>
	import { Locale } from "wx-svelte-core";
	import en from "../en.js";

	import Editor from "./FormEditor.svelte";
	import Values from "./Values.svelte";

	// incoming parameters
	let {
		values = {},
		items = [],
		css = "",
		activeBatch = null,
		focus = false,
		autoSave = true,
		autoApply = true,
		readonly = false,
		children,
		...restProps
	} = $props();
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
			{autoApply}
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
