<script>
	import { onMount } from "svelte";

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

	let root = $state();
	onMount(() => {
		if (focus) {
			// if the focus is already inside the root, don't do anything
			const focused = document.activeElement;
			if (focused && root.contains(focused)) return;

			// get the first input, textarea or select element and focus it
			const input = root.querySelector("input, textarea, select");
			if (input) {
				setTimeout(() => {
					input.select();
					input.focus();
				}, 300);
			}
		}
	});
</script>

<Locale words={en} optional={true}>
	<div class="wx-content" bind:this={root}>
		<Values
			view={Editor}
			{values}
			{items}
			{css}
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
