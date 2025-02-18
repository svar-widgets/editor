<script>
	import { getContext } from "svelte";
	import { getData } from "../data";
	import { Editor } from "/src";

	import { registerEditorItem } from "/src";
	import {
		Combo,
		ColorPicker,
		DatePicker,
		Slider,
		MultiCombo,
	} from "wx-svelte-core";

	registerEditorItem("combo", Combo);
	registerEditorItem("color", ColorPicker);
	registerEditorItem("date", DatePicker);
	registerEditorItem("slider", Slider);
	registerEditorItem("multiselect", MultiCombo);

	import { dateToString } from "wx-lib-dom";
	const _ = getContext("wx-i18n");
	const format = dateToString("%M %d %Y", _.getRaw().calendar);

	const { listItems, listData } = $state(getData());

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
</script>

<div class="message">{message}</div>

<div class="list">
	{#each listData as data (data.id)}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="item"
			onclick={() => (selected = data)}
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
		autoSave={true}
		items={listItems}
		values={selected}
		placement="sidebar"
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
