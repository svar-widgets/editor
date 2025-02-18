<script>
	import { getData } from "../data";
	import { Editor, Form, registerEditorItem } from "/src";
	import { Button } from "wx-svelte-core";

	import { Tasklist } from "wx-svelte-tasklist";
	import { Comments } from "wx-svelte-comments";
	registerEditorItem("tasks", Tasklist);
	registerEditorItem("comments", Comments);

	const { listData, users } = getData();

	const bottomBar = {
		items: [
			{ comp: "spacer" },
			{
				comp: "button",
				type: "primary",
				text: "Save",
				id: "save",
			},
			{ comp: "button", text: "Cancel", id: "cancel" },
		],
	};

	const config1 = {
		placement: "modal",
		layout: "columns",
		autoSave: false,
		items: [
			{ comp: "text", key: "label", label: "Name", column: "left" },
			{ comp: "tasks", key: "task", label: "Tasks" },
			{
				comp: "comments",
				key: "comments",
				label: "Comments",
				users,
				activeUser: 1,
				column: "left",
			},
		],
	};

	const config2 = {
		...config1,
		bottomBar,
	};

	const config3 = {
		placement: "sidebar",
		autoSave: true,
		items: [
			{ comp: "text", key: "label", label: "Name" },
			{ comp: "tasks", key: "task", label: "Tasks" },
			{
				comp: "comments",
				key: "comments",
				label: "Comments",
				users,
				activeUser: 1,
			},
		],
	};

	const config4 = {
		...config3,
		bottomBar,
	};

	const config5 = {
		placement: "modal",
		autoSave: true,
		items: [
			{ comp: "text", key: "label", label: "Name" },
			{ comp: "tasks", key: "task", label: "Tasks" },
			{
				comp: "comments",
				key: "comments",
				label: "Comments",
				users,
				activeUser: 1,
			},
		],
	};

	const config6 = {
		...config5,
		bottomBar,
	};

	let visible = $state(false);
	let config = $state(config1);
</script>

<div class="toolbar">
	<div class="item">
		<Button
			type="primary"
			text="Open Modal with 2 columns with top bar"
			onclick={() => {
				config = config1;
				visible = true;
			}}
		/>
	</div>
	<div class="item">
		<Button
			text="Open Modal with columns with bottom bar"
			onclick={() => {
				config = config2;
				visible = true;
			}}
		/>
	</div>

	<div class="item">
		<Button
			text="Open Sidebar with scroll and top bar"
			onclick={() => {
				config = config3;
				visible = true;
			}}
		/>
	</div>

	<div class="item">
		<Button
			text="Open Sidebar with scroll and bottom bar"
			onclick={() => {
				config = config4;
				visible = true;
			}}
		/>
	</div>

	<div class="item">
		<Button
			text="Open Modal with scroll and top bar"
			onclick={() => {
				config = config5;
				visible = true;
			}}
		/>
	</div>

	<div class="item">
		<Button
			text="Open Modal with scroll and bottom bar"
			onclick={() => {
				config = config6;
				visible = true;
			}}
		/>
	</div>
</div>

<h4 style="margin: 20px">Form example</h4>
<div class="form">
	<Form items={config1.items} values={listData[0]} />
</div>

{#if visible}
	<Editor
		{...config}
		values={listData[0]}
		onaction={() => (visible = false)}
	/>
{/if}

<style>
	.toolbar {
		display: flex;
		align-items: flex-start;
		overflow-y: auto;
		align-content: flex-start;
		flex-wrap: wrap;
		padding: 10px;
	}
	.toolbar .item {
		margin: 10px;
		display: flex;
		flex-direction: column;
	}

	.form {
		margin: 40px;
		height: 600px;
		width: 400px;
	}
</style>
