<script>
	import { WillowDark } from "wx-svelte-core";
	let { fonts = true, children } = $props();
</script>

{#if children}
	<WillowDark {fonts}>{@render children()}</WillowDark>
{:else}
	<WillowDark {fonts} />
{/if}

<style>
	:global(.wx-willow-dark-theme) {
		/*PLACE HERE*/
	}
</style>
