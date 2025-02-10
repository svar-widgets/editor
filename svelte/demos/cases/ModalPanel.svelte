<script>
	import { getData } from "../data";
	import { Editor } from "/src";
	import { Button } from "wx-svelte-core";

	const { items, values } = getData();

	let message = $state("");
	let visible = $state(true);

	function handleClick({ item }) {
		message = "click: " + item.id;
		visible = false;
	}

	let placement = $state("modal");
	let autoSave = $state(false);
	let readonly = $state(false);
</script>

<div class="message">{message}</div>

<div class="toolbar">
	<div class="item">
		<Button
			type="primary"
			text="Open editor: Manual save"
			onclick={() => {
				placement = "modal";
				autoSave = false;
				readonly = false;
				visible = true;
			}}
		/>
	</div>
	<div class="item">
		<Button
			type=""
			text="Open editor: Auto-save"
			onclick={() => {
				placement = "modal";
				autoSave = true;
				readonly = false;
				visible = true;
			}}
		/>
	</div>
	<div class="item">
		<Button
			type=""
			text="Open editor: Readonly"
			onclick={() => {
				placement = "modal";
				readonly = true;
				visible = true;
			}}
		/>
	</div>
</div>

{#if visible}
	<Editor
		{placement}
		{readonly}
		{autoSave}
		{items}
		{values}
		onaction={handleClick}
	/>
{/if}

<style>
	.message {
		padding: 5px 10px;
		background-color: #eee;
		color: #444;
		line-height: 33px;
		height: 40px;
	}
	.toolbar {
		display: flex;
		flex-direction: row;
		padding: 10px;
	}
	.toolbar .item {
		margin-left: 20px;
	}
</style>
