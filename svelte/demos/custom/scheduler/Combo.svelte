<script>
	import { Combo } from "wx-svelte-core";

	let { template, value, onchange, options, ...restProps } = $props();
</script>

<Combo {value} {onchange} {options} {...restProps}>
	{#snippet children({ option })}
		{@const Component = template}
		<Component {option} />
	{/snippet}
</Combo>
