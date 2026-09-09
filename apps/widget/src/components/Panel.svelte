<script lang="ts">
	import { getContext } from "svelte";
	import { hotkeys as libHotkeys } from "@svar-ui/lib-dom";

	import Columns from "./Columns.svelte";
	import Toolbar from "./buttons/Toolbar.svelte";

	import {
		SaveButton,
		CancelButton,
		CloseIcon,
		Spacer,
	} from "./buttons/buttons.js";
	import type {
		IEditorsConfig,
		IButton,
		TValues,
		TErrors,
		TBar,
		THotkeys,
		IWxI18n,
		Snippet,
		TChangeHandler,
		TActionHandler,
	} from "../types.js";

	interface Props {
		data: TValues;
		editors: IEditorsConfig;
		focus?: boolean;
		css?: string;
		topBar?: TBar;
		bottomBar?: TBar;
		layout?: string;
		placement?: string;
		errors?: TErrors;
		readonly?: boolean;
		autoSave?: boolean;
		children?: Snippet;
		onclick?: TActionHandler;
		onkeydown?: TActionHandler;
		onchange?: TChangeHandler;
		hotkeys?: THotkeys;
	}
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
		hotkeys,
	}: Props = $props();

	const _ = getContext<IWxI18n>("wx-i18n").getGroup("editor");

	let autoBars = $derived(topBar === true && bottomBar === true);
	let tbar = $derived.by<IButton[]>(() => {
		let bar: IButton[] =
			topBar && typeof topBar === "object" && topBar.items
				? topBar.items.map(b => ({ ...b }))
				: [];

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

	let bbar = $derived.by<IButton[]>(() => {
		let bar: IButton[] =
			bottomBar && typeof bottomBar === "object" && bottomBar.items
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

	const getHotkeyHandler = (
		item: IButton | undefined
	): ((event?: KeyboardEvent) => void) | false => {
		if (!item) return false;
		return event => {
			if (!event) return;
			const target = event.target as HTMLElement;

			if (
				event.key == "Escape" &&
				(target.closest(".wx-combo") ||
					target.closest(".wx-multicombo") ||
					target.closest(".wx-richselect"))
			)
				return;

			if (
				event.key == "Delete" &&
				(target.tagName === "INPUT" || target.tagName === "TEXTAREA")
			)
				return;

			event.preventDefault();
			onkeydown?.({ item });
		};
	};
	let node: HTMLDivElement | null = null;
	let buttons = $derived([...tbar, ...bbar]);

	// pass-through bar config (everything except `items`, which is computed)
	let topBarProps = $derived(
		topBar && typeof topBar === "object" ? topBar : {}
	);
	let bottomBarProps = $derived(
		bottomBar && typeof bottomBar === "object" ? bottomBar : {}
	);

	$effect(() => {
		if (hotkeys === false) return;
		const defaultHotkeys = {
			"ctrl+s": getHotkeyHandler(buttons.find(t => t.id === "save")),
			escape: getHotkeyHandler(
				buttons.find(t => t.id === "cancel" || t.id === "close")
			),
			delete: getHotkeyHandler(buttons.find(t => t.id === "delete")),
		};
		const config = { ...defaultHotkeys, ...hotkeys };
		if (node) $libHotkeys.configure(config, node);
	});
</script>

<div class={css} bind:this={node} tabindex="-1" style={"outline: none;"}>
	<Toolbar {...topBarProps} items={tbar} values={data} {onclick} />
	<div class="wx-content" class:wx-layout-columns={layout === "columns"}>
		{#if children}{@render children()}{/if}
		<Columns
			{editors}
			{layout}
			{data}
			{focus}
			{errors}
			{readonly}
			{onclick}
			{onchange}
		/>
		<Toolbar
			{...bottomBarProps}
			items={bbar}
			values={data}
			top={false}
			{onclick}
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
