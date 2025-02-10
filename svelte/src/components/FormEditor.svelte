<script>
	import { Field } from "wx-svelte-core";

	import { getItemHandler } from "../helpers";

	let {
		editors,
		data,
		css = "",
		errors,
		onclick,
		children,
		onchange,
	} = $props();
</script>

<div class="wx-sections {css}">
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
