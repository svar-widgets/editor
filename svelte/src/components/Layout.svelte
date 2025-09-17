<script>
	import { ModalArea, SideArea } from "@svar-ui/svelte-core";
	import Panel from "./Panel.svelte";

	let { css, onclick, placement, ...restProps } = $props();

	function handleClose() {
		onclick && onclick({ item: { id: "close" } });
	}
</script>

{#if placement === "modal"}
	<ModalArea>
		<Panel css={`wx-panel ${css}`} {onclick} {placement} {...restProps} />
	</ModalArea>
{:else if placement === "sidebar"}
	<SideArea oncancel={handleClose}>
		<Panel css={`wx-panel ${css}`} {onclick} {placement} {...restProps} />
	</SideArea>
{:else}
	<Panel css={`wx-inline-form ${css}`} {onclick} {placement} {...restProps} />
{/if}
