<script>
	import { getData } from "../data";
	import { Editor, registerEditorItem } from "/src";
	import { Button } from "wx-svelte-core";

	import { Tasklist } from "wx-svelte-tasklist";
	import { Comments } from "wx-svelte-comments";
	registerEditorItem("tasks", Tasklist);
	registerEditorItem("comments", Comments);

	const { listData, users } = getData();

	const config1 = {
		placement: "modal",
		layout: "columns",
		autoSave: false,
		items: [
			{ comp: "text", key: "name", label: "Name", column: "left" },
			{
				comp: "select",
				key: "role",
				label: "Role",
				options: [
					{ id: "admin", label: "Admin" },
					{ id: "user", label: "User" },
				],
			},
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
		placement: "modal",
		layout: "columns",
		autoSave: false,
		items: [
			{ comp: "text", key: "name", label: "Name", column: "left" },
			{
				comp: "select",
				key: "role",
				label: "Role",
				options: [
					{ id: "admin", label: "Admin" },
					{ id: "user", label: "User" },
				],
			},
			{ comp: "tasks", key: "task", label: "Tasks", column: "left" },
			{
				comp: "comments",
				key: "comments",
				label: "Comments",
				users,
				activeUser: 1,
			},
		],
	};

	const config3 = {
		placement: "sidebar",
		autoSave: true,
		items: [
			{ comp: "text", key: "name", label: "Name" },
			{
				comp: "select",
				key: "role",
				label: "Role",
				options: [
					{ id: "admin", label: "Admin" },
					{ id: "user", label: "User" },
				],
			},
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
		placement: "modal",
		autoSave: true,
		items: [
			{ comp: "text", key: "name", label: "Name" },
			{
				comp: "select",
				key: "role",
				label: "Role",
				options: [
					{ id: "admin", label: "Admin" },
					{ id: "user", label: "User" },
				],
			},
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

	let visible = $state(true);
	let config = $state(config1);
</script>

<div class="toolbar">
	<div class="item">
		<Button
			type="primary"
			text="Open: Comments | Tasks"
			onclick={() => {
				config = config1;
				visible = true;
			}}
		/>
	</div>
	<div class="item">
		<Button
			text="Open: Tasks | Comments"
			onclick={() => {
				config = config2;
				visible = true;
			}}
		/>
	</div>

	<div class="item">
		<Button
			text="Open: Sidebar with scroll"
			onclick={() => {
				config = config3;
				visible = true;
			}}
		/>
	</div>

	<div class="item">
		<Button
			text="Open: Modal with scroll"
			onclick={() => {
				config = config4;
				visible = true;
			}}
		/>
	</div>
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
		flex-direction: row;
		padding: 10px;
	}
	.toolbar .item {
		margin-left: 20px;
	}
</style>
