<script>
	import { Toolbar } from "@svar-ui/svelte-toolbar";

	let {
		items,
		values = null,
		top = true,
		onclick,
		onchange: onchangeform,
		css = "",
		layout = "row",
	} = $props();
	const onchange = ({ item, value }) => {
		onchangeform && onchangeform({ key: item.key, value });
	};
</script>

{#if items.length}
	<div
		class="wx-editor-toolbar {css}"
		class:wx-topbar={top}
		class:wx-bottom={!top}
	>
		<Toolbar
			{items}
			values={$state.snapshot(values)}
			{onclick}
			{onchange}
			{layout}
		/>
	</div>
{/if}

<style>
	.wx-editor-toolbar {
		padding: 0 20px;
	}

	.wx-editor-toolbar :global(.toolbar) {
		padding: 0;
		gap: 4px;
	}

	.wx-editor-toolbar :global(.toolbar .tb-element) {
		padding: 0;
	}

	.wx-topbar {
		margin-bottom: 10px;
	}
	.wx-bottom {
		margin-top: 10px;
	}
</style>
