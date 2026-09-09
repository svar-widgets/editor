<script lang="ts">
	import { ModalArea, SideArea } from "@svar-ui/svelte-core";
	import Panel from "./Panel.svelte";
	import type {
		IEditorsConfig,
		TValues,
		TActionHandler,
	} from "../types.js";

	// Layout is a thin placement wrapper, forwarding everything to Panel.
	interface Props {
		data: TValues;
		editors: IEditorsConfig;
		css?: string;
		placement?: string;
		onclick?: TActionHandler;
		[key: string]: any;
	}
	let { css, onclick, placement, ...restProps }: Props = $props();

	function handleClose() {
		onclick?.({ item: { id: "close" } });
	}
</script>

{#if placement === "modal"}
	<ModalArea>
		<Panel css={`wx-editor wx-panel ${css}`} {onclick} {placement} {...restProps} />
	</ModalArea>
{:else if placement === "fullscreen"}
	<div class="wx-editor-fullscreen">
		<Panel css={`wx-editor wx-inline-form ${css}`} {onclick} {placement} {...restProps} />
	</div>
{:else if placement === "sidebar"}
	<SideArea oncancel={handleClose}>
		<Panel css={`wx-editor wx-panel ${css}`} {onclick} {placement} {...restProps} />
	</SideArea>
{:else}
	<Panel css={`wx-editor wx-inline-form ${css}`} {onclick} {placement} {...restProps} />
{/if}

<style>
	.wx-editor-fullscreen {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: var(--wx-background);
		overflow: auto;
		z-index: var(--wx-popup-z-index);
	}
</style>