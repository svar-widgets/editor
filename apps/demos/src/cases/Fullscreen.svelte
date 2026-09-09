<script lang="ts">
	import { getData } from "../data";
	import { Editor, registerEditorItem } from "@svar-ui/svelte-editor";

	import { Comments } from "@svar-ui/svelte-comments";
	import {
		Combo,
		ColorPicker,
		DatePicker,
		Slider,
		Button,
		MultiCombo,
	} from "@svar-ui/svelte-core";

	registerEditorItem("combo", Combo);
	registerEditorItem("color", ColorPicker);
	registerEditorItem("date", DatePicker);
	registerEditorItem("slider", Slider);
	registerEditorItem("multiselect", MultiCombo);

	registerEditorItem("comments", Comments);
	registerEditorItem("comments", Comments, { readonly: true });

	let { listItems, listData, users } = getData();
	const items = [
		{
			comp: "comments",
			key: "comments",
			label: "Comments",
			users,
			activeUser: 1,
			column: "left",
		},
		...listItems,
	];
	const values = listData[0];


	let message = $state("");
	let visible = $state(true);

	function handleClick({ item }: any) {
		message = "click: " + item.id;
		visible = false;
	}

	let placement = $state("fullscreen");
	let layout = $state("columns");
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
				placement = "fullscreen";
				layout = "columns";
				autoSave = false;
				readonly = false;

				visible = true;
			}}
		/>
	</div>
	<div class="item">
		<Button
			type={"" as any}
			text="Open editor: Auto-save"
			onclick={() => {
				placement = "fullscreen";
				layout = "columns";
				autoSave = true;
				readonly = false;

				visible = true;
			}}
		/>
	</div>
	<div class="item">
		<Button
			type={"" as any}
			text="Open editor: Readonly"
			onclick={() => {
				placement = "fullscreen";
				layout = "columns";
				readonly = true;

				visible = true;
			}}
		/>
	</div>
</div>

{#if visible}
	<Editor
		{autoSave}
		{placement}
		{layout}
		{readonly}
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
