<script>
	import { Combo } from "@svar-ui/svelte-core";

	let { template, value, onchange, options, ...restProps } = $props();
</script>

<Combo {value} {onchange} {options} {...restProps}>
	{#snippet children({ option })}
		{@const Component = template}
		<Component {option} />
	{/snippet}
</Combo>
