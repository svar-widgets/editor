<script>
	import { onMount } from "svelte";
	import { Field } from "wx-svelte-core";

	import { getItemHandler } from "../helpers";

	let {
		editors,
		data,
		css = "",
		errors,
		focus = false,
		onclick,
		children,
		onchange,
	} = $props();

	let root = $state();
	onMount(() => {
		if (focus) {
			// if the focus is already inside the root, don't do anything
			const focused = document.activeElement;
			if (focused && root.contains(focused)) return;

			// get the first input, textarea or select element and focus it
			const input = root.querySelector(
				"input:not([disabled]), textarea:not([disabled]), select:not([disabled])"
			);
			if (input) {
				setTimeout(() => {
					input.select();
					input.focus();
				}, 300);
			}
		}
	});
</script>

<div class="wx-sections {css}" bind:this={root}>
	{#if children}{@render children()}{/if}
	{#each editors.config as editor}
		{#if !editor.hidden}
			{#if editor.comp === "readonly" || editor.comp === "section"}
				{@const Component = getItemHandler(editor.comp)}
				<Component
					label={editor.label}
					value={data[editor.key]}
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
						{#snippet children({ id })}
							{@const Component2 = getItemHandler(editor.comp)}
							<Component2
								onchange={ev =>
									onchange &&
									onchange({
										value: ev.value,
										key: editor.key,
									})}
								{...editor}
								{id}
								label={undefined}
								error={errors && errors[editor.key]}
								value={data[editor.key]}
							/>
						{/snippet}
					</Field>
					{#if errors && errors[editor.key] && editor.validationMessage}
						<div class="message">{editor.validationMessage}</div>
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
	.message {
		margin-top: calc(var(--wx-field-gutter) * -1);
		font-size: 12px;
		line-height: var(--wx-field-gutter);
		color: var(--wx-color-danger);
		width: inherit;
	}
</style>
