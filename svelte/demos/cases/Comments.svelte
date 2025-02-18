<script>
	import { getContext } from "svelte";
	import { getData } from "../data";
	import { Editor, registerEditorItem } from "../../src";

	import { Comments } from "wx-svelte-comments";
	registerEditorItem("comments", Comments);

	import { dateToString } from "wx-lib-dom";
	const _ = getContext("wx-i18n");
	const format = dateToString("%M %d %Y", _.getRaw().calendar);

	let { listItems, listData, users } = $state(getData());

	const demoItems = [
		listItems[0],
		{
			comp: "comments",
			key: "comments",
			label: "Comments",
			users,
			activeUser: 1,
		},
	];

	let message = $state("");
	function handleClick({ item }) {
		message = "click: " + item.id;
		selected = null;
	}

	let selected = $state(listData[0]);
	const refresh = ({ values }) => {
		message = "update";

		// update data
		const ind = listData.findIndex(d => d.id === values.id);
		listData[ind] = values;
	};

	const select = id => {
		setTimeout(() => {
			selected = listData.find(d => d.id === id);
		}, 100);
	};
</script>

<div class="message">{message}</div>

<div class="list">
	{#each listData as data}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="item"
			onclick={() => select(data.id)}
			class:active={selected?.id === data.id}
		>
			<h4>{data.label}</h4>
			<p>{data.description || ""}</p>
			<sub>starts on: {format(data.start_date)}</sub>
		</div>
	{/each}
</div>

{#if selected}
	<Editor
		placement="sidebar"
		autoSave={true}
		items={demoItems}
		values={selected}
		focus={true}
		onaction={handleClick}
		onsave={refresh}
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
	.list {
		margin: 10px;
	}
	.item {
		margin: 10px;
		width: 360px;
		border: 1px solid #ccc;
		box-shadow: 0 0 5px #eee;
		padding: 0px 15px 10px 15px;
	}
	.item.active {
		border-left: 3px solid #2e51ff;
		box-shadow: 0 0 5px #aaa;
		padding-left: 13px;
	}
</style>
