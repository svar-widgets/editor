<script lang="ts">
	import { onMount, getContext } from "svelte";
	import { Field } from "@svar-ui/svelte-core";

	import { getItemHandler } from "../helpers/handlers.js";
	import type {
		IEditorsConfig,
		TValues,
		TErrors,
		IWxI18n,
		Snippet,
		TChangeHandler,
		TActionHandler,
		TID,
	} from "../types.js";

	interface Props {
		editors: IEditorsConfig;
		data: TValues;
		css?: string;
		errors?: TErrors;
		focus?: boolean;
		readonly?: boolean;
		onclick?: TActionHandler;
		children?: Snippet;
		onchange?: TChangeHandler;
	}
	let {
		editors,
		data,
		css = "",
		errors,
		focus = false,
		readonly = false,
		onclick,
		children,
		onchange,
	}: Props = $props();

	let root = $state<HTMLDivElement>();
	onMount(() => {
		if (focus && root) {
			// if the focus is already inside the root, don't do anything
			const focused = document.activeElement;
			if (focused && root.contains(focused)) return;

			// get the first input, textarea or select element and focus it
			const input = root.querySelector(
				"input:not([disabled]), textarea:not([disabled]), select:not([disabled])"
			) as HTMLInputElement | null;
			if (input) {
				setTimeout(() => {
					input.select();
					input.focus();
				}, 300);
			}
		}
	});

	const _ = getContext<IWxI18n>("wx-i18n").getGroup("editor");

	let overlay = $derived(
		readonly && editors.config.every(
			editor => !(editor.keys || [editor.key]).some(k => (k as string) in data)
		)
	);

	let isSingle = $derived(editors.config.length === 1 && editors.config[0].fill);
	let onchangeHandler = (key: TID) => (ev: {
								value: any;
								input?: boolean;
							}) => {
								onchange?.({
										value: ev.value,
										key: key,
										input: ev.input,
									});
							}
</script>

<div class="wx-sections {css}" class:wx-sections-single={isSingle} bind:this={root}>
	{#if children}{@render children()}{/if}
	{#if overlay}
		<div class="wx-overlay">{_("No data")}</div>
	{/if}
	{#each editors.config as editor}
		{#if !editor.hidden}
			{#if editor.comp === "readonly" || editor.comp === "section" || isSingle}
				{@const Component = getItemHandler(editor.comp, { readonly })}
				<Component
					onchange={onchangeHandler(editor.key)}
					label={editor.label}
					value={data[editor.key]}
					readonly={readonly}
					error={errors && errors[editor.key]}
					{...editor}
					{onclick}
				/>
			{:else}
				<div>
					<Field
						label={editor.labelTemplate
							? editor.labelTemplate(data[editor.key])
							: (editor.label ?? "")}
						required={editor.required}
					>
						{@const Component2 = getItemHandler(editor.comp, { readonly })}
						<Component2
							onchange={onchangeHandler(editor.key)}
							{...editor}
							readonly={readonly}
							label={undefined}
							error={errors && errors[editor.key]}
							value={data[editor.key]}
						/>
					</Field>
					{#if errors && errors[editor.key] && editor.validationMessage}
						<div class="wx-message">{editor.validationMessage}</div>
					{/if}
				</div>
			{/if}
		{/if}
	{/each}
</div>

<style>
	.wx-sections {
		text-align: left;
		--wx-field-width: 600px;
		margin: 12px 20px 0;
	}
	.wx-sections-single {
		margin: 0 20px;
		height: 100%;
	}
	.wx-message {
		margin-top: calc(var(--wx-field-gutter) * -1);
		font-size: 12px;
		line-height: var(--wx-field-gutter);
		color: var(--wx-color-danger);
		width: inherit;
	}
	.wx-overlay {
		font-weight: 600;
	}
</style>
