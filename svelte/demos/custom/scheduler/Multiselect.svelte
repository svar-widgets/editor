<script>
	import { MultiCombo } from "wx-svelte-core";

	let { value, options, template, onchange, ...restProps } = $props();
</script>

<MultiCombo {value} {options} {onchange} {...restProps}>
	{#snippet children({ option })}
		{@const Component = template}
		<div>
			<Component {option} />
		</div>
	{/snippet}
</MultiCombo>
