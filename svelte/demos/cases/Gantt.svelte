<script>
	import { Editor, registerEditorItem } from "../../src";
	import { Counter } from "@svar-ui/svelte-core";

	import Links from "../custom/gantt/Links.svelte";

	registerEditorItem("counter", Counter);
	registerEditorItem("link", Links);

	let tasks = $state([
		{
			id: 1,
			start: new Date(2024, 3, 2),
			end: new Date(2024, 3, 17),
			text: "Project planning",
			progress: 30,
			parent: 0,
			type: "project",
			duration: 15,
			details: "",
		},
		{
			id: 10,
			start: new Date(2024, 3, 2),
			end: new Date(2024, 3, 5),
			text: "Marketing analysis",
			progress: 100,
			parent: 1,
			type: "task",
			duration: 4,
			details: "",
		},
		{
			id: 11,
			start: new Date(2024, 3, 5),
			end: new Date(2024, 3, 7),
			text: "Discussions",
			progress: 100,
			parent: 1,
			type: "task",
			duration: 2,
			details: "",
		},
		{
			id: 12,
			start: new Date(2024, 3, 8),
			text: "Approval of strategy",
			progress: 100,
			parent: 1,
			type: "milestone",
		},
	]);

	const links = [
		{
			id: 1,
			source: 10,
			target: 11,
			type: "e2s",
		},
		{
			id: 2,
			source: 11,
			target: 12,
			type: "e2s",
		},
	];

	const listItems = [
		{
			key: "text",
			comp: "text",
			label: "Name",
			config: {
				placeholder: "Add task name",
			},
		},
		{
			comp: "textarea",
			key: "details",
			label: "Description",
			config: {
				placeholder: "Add description",
			},
		},
		{
			comp: "combo",
			key: "type",
			label: "Type",
			options: [
				{ id: "task", label: "Task" },
				{ id: "project", label: "Project" },
				{ id: "milestone", label: "Milestone" },
			],
		},
		{
			comp: "date",
			key: "start",
			label: "Start date",
		},
		{
			comp: "date",
			key: "end",
			label: "End date",
		},
		{
			comp: "counter",
			key: "duration",
			label: "Duration",
			config: { min: 1, max: 100 },
		},
		{
			comp: "slider",
			key: "progress",
			labelTemplate: value => `Progress ${value}%`,
		},
		{
			comp: "link",
			key: "link",
			label: "",
		},
	];

	function getLinks(id) {
		const inLinks = links
			.filter(a => a.target == id)
			.map(link => ({ link, task: getTask(link.source) }));

		const outLinks = links
			.filter(a => a.source == id)
			.map(link => ({ link, task: getTask(link.target) }));

		return [
			{ title: "Predecessors", data: inLinks },
			{ title: "Successors", data: outLinks },
		];
	}

	// imitates gantt api.getTask()
	function getTask(id) {
		return tasks.find(t => t.id === id);
	}

	function handleClick({ item, values }) {
		const actionId = item.id;
		const id = values.id;
		if (actionId === "delete") {
			tasks = tasks.filter(t => t.id !== id);
		}
		activeTask = null;
	}

	let activeTask = $state(null);

	function selectActive(data) {
		const link = getLinks(data.id);

		activeTask = {
			...data,
			link,
		};
	}

	const refresh = ({ values }) => {
		const ind = tasks.findIndex(d => d.id === values.id);
		tasks[ind] = values;
	};
</script>

<h4 style="margin-left: 20px;">Imitation of gantt project progress</h4>

<div class="tasks">
	{#each tasks as data}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="item"
			onclick={() => selectActive(data)}
			class:active={activeTask?.id === data.id}
		>
			<div class="content">{data.text}</div>
		</div>
	{/each}
</div>

{#if activeTask}
	<Editor
		topBar={{
			items: [
				{
					comp: "icon",
					icon: "wxi-close",
					id: "close",
				},
				{ comp: "spacer" },
				{
					comp: "button",
					type: "danger",
					text: "Delete",
					id: "delete",
				},
				{
					type: "primary",
					comp: "button",
					text: "Save",
					id: "save",
				},
			],
		}}
		placement="sidebar"
		autoSave={true}
		items={listItems}
		values={activeTask}
		onaction={handleClick}
		onsave={refresh}
	/>
{/if}

<style>
	.tasks {
		margin: 10px;
	}
	.item {
		margin: 10px;
		width: fit-content;
		border: 1px solid #ccc;
		border-radius: 0 5px 5px 0;
		box-shadow: 0 0 5px #eee;
	}
	.item.active {
		border-left: 3px solid #2e51ff;
		box-shadow: 0 0 5px #aaa;
	}
	.content {
		padding: 5px 60px;
		text-align: center;
		background: #00ba94;
	}
</style>
