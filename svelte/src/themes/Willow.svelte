<script>
	import { Willow } from "wx-svelte-core";
	let { fonts = true, children } = $props();
</script>

{#if children}
	<Willow {fonts}>{@render children()}</Willow>
{:else}
	<Willow {fonts} />
{/if}

<style>
	:global(.wx-willow-theme) {
		/*PLACE HERE*/
	}
</style>
