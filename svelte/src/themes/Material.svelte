<script>
	import { Material } from "wx-svelte-core";
	let { fonts = true, children } = $props();
</script>

{#if children}
	<Material {fonts}>{@render children()}</Material>
{:else}
	<Material {fonts} />
{/if}

<style>
	:global(.wx-material-theme) {
		/*PLACE HERE*/
	}
</style>
