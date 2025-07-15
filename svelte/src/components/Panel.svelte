<script>
	import { getContext } from "svelte";
	import { hotkeys } from "../hotkeys";

	import Columns from "./Columns.svelte";
	import Toolbar from "./buttons/Toolbar.svelte";

	import {
		SaveButton,
		CancelButton,
		CloseIcon,
		Spacer,
	} from "./buttons/buttons.js";

	let {
		data,
		editors,
		focus,
		css,
		topBar,
		bottomBar,
		layout,
		placement,
		errors,
		readonly,
		autoSave,
		children,
		onclick,
		onkeydown,
		onchange,
	} = $props();

	const _ = getContext("wx-i18n").getGroup("editor");

	let autoBars = $derived(topBar === true && bottomBar === true);
	let tbar = $derived.by(() => {
		let bar =
			topBar && topBar.items ? topBar.items.map(b => ({ ...b })) : [];

		if (autoBars) {
			if (!readonly) {
				if (autoSave) bar = [Spacer(), CloseIcon()];
				else if (placement !== "modal")
					bar = [Spacer(), CancelButton(_), SaveButton(_)];

				if (layout === "columns" && !bar.length)
					bar = [Spacer(), SaveButton(_), CancelButton(_)];
			} else {
				bar = [Spacer(), CloseIcon()];
			}
		}

		return bar;
	});

	let bbar = $derived.by(() => {
		let bar =
			bottomBar && bottomBar.items
				? bottomBar.items.map(b => ({ ...b }))
				: [];

		if (autoBars) {
			if (!readonly) {
				if (placement === "modal" && !autoSave)
					bar = [Spacer(), SaveButton(_), CancelButton(_)];
				if (layout === "columns" && tbar.length) bar = [];
			}
		}

		return bar;
	});

	let buttons = $derived([...tbar, ...bbar]);
</script>

<div
	class={css}
	use:hotkeys={{
		keys: {
			"ctrl+s": buttons.find(t => t.id === "save"),
			escape: buttons.find(t => t.id === "cancel" || t.id === "close"),
			"ctrl+d": buttons.find(t => t.id === "delete"),
		},
		action: item => {
			onkeydown && onkeydown({ item });
		},
	}}
>
	<Toolbar {...topBar} items={tbar} values={data} {onclick} {onchange} />
	<div class="wx-content" class:wx-layout-columns={layout === "columns"}>
		{#if children}{@render children()}{/if}
		<Columns
			{editors}
			{layout}
			{data}
			{focus}
			{errors}
			{onclick}
			{onchange}
		/>
		<Toolbar
			{...bottomBar}
			items={bbar}
			values={data}
			top={false}
			{onclick}
			{onchange}
		/>
	</div>
</div>

<style>
	.wx-panel {
		padding: 16px 0;
		max-height: 100vh;
		display: grid;
		height: 100%;
		grid-template-rows: auto 1fr;
	}

	.wx-content {
		height: 100%;
		overflow-y: auto;
	}

	.wx-inline-form,
	.wx-inline-form .wx-content {
		overflow: visible;
	}

	.wx-content.wx-layout-columns {
		overflow-y: hidden;
		/* grid needs for layout columns with bottom bar */
		display: grid;
		grid-template-rows: minmax(0, auto) 1fr;
	}
</style>
