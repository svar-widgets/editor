<script>
	import { getContext } from "svelte";
	import { getData } from "./data";
	import { Editor, registerEditorItem } from "@svar-ui/svelte-editor";
	import { Comments } from "@svar-ui/svelte-comments";
	import { RichSelect, TextArea, DatePicker, Slider } from "@svar-ui/svelte-core";

	let { skin = $bindable() } = $props();

	registerEditorItem("comments", Comments);
	registerEditorItem("textarea", TextArea);
	registerEditorItem("select", RichSelect);
	registerEditorItem("date", DatePicker);
	registerEditorItem("slider", Slider);

	import { dateToString } from "@svar-ui/lib-dom";
	const _ = getContext("wx-i18n");
	const format = dateToString("%M %d %Y", _.getRaw().calendar);

	const { items, data, users, priority } = $state(getData());

	function handleClick({ values, item }) {
		if (item.id == "cancel") selected = null;
		//no info from validation, so need to check
		else if (values.title && values.start_date && values.description)
			selected = null;
	}

	let selected = $state(data[0]);
	function refresh({ values }) {
		const ind = data.findIndex(d => d.id === values.id);
		data[ind] = values;
	}
</script>

<div class="list">
	{#each data as card}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="item-wrapper"
			onclick={() => (selected = card)}
			class:active={selected?.id === card.id}
		>
			<div
				class="colorline"
				style="background-color:{priority[card.priority - 1].color}"
			></div>
			<div class="item">
				<h3>{card.title}</h3>
				<div class="toolbar">
					<span class="sub">Assigned to:</span>
					<div
						class="avatar-icon"
						style="background-color:{users[card.assigned - 1]
							.color}"
					>
						{users[card.assigned - 1].initials}
					</div>
					<b>{users[card.assigned - 1].name}</b>
				</div>
				<p class="description">{card.description || ""}</p>
				<div class="toolbar data">
					<p>
						<span class="sub">Priority:</span>
						{priority[card.priority - 1].name}
					</p>
					<p>
						<span class="sub">Progress:</span>
						{card.progress + "%"}
					</p>
					<p>
						<span class="sub">Due date:</span>
						{format(card.start_date)}
					</p>
				</div>
			</div>
		</div>
	{/each}
</div>

{#if selected}
	<Editor
		{items}
		values={selected}
		placement="modal"
		layout="columns"
		onaction={handleClick}
		onsave={refresh}
	/>
{/if}

<style>
	.list {
		flex-wrap: wrap;
		height: 100%;
		border-top: none;
		padding: 30px 20px 10px;
		display: flex;
		align-items: flex-start;
		overflow-y: auto;
		align-content: flex-start;
		outline: none;
	}
	.item-wrapper {
		display: flex;
		flex-direction: column;
		width: 548px;
		height: 284px;
		overflow: hidden;
		cursor: pointer;
		border-radius: 6px;
		margin: 10px;
		border: 1px solid #e6e6e6;
		box-shadow: 0px 4px 20px 0px #2c2f3c1f;
	}
	:global(.wx-willow-dark-theme .list .item-wrapper) {
		box-shadow: 0px 4px 16px 0px #00000099;
		border: 1px solid #384047;
	}
	.item {
		padding: 0px 20px 0px 20px;
	}
	.colorline {
		height: 8px;
		width: 100%;
	}
	.sub {
		color: #9fa1ae;
		font-size: 12px;
	}
	.avatar-icon {
		height: 24px;
		width: 24px;
		font-size: 12px;
		font-weight: 500;
		line-height: 12px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}
	.toolbar {
		width: 100%;
		display: flex;
		gap: 8px;
	}
	.toolbar.data {
		gap: 100px;
	}
	.toolbar p {
		font-size: 12px;
	}
	.description {
		height: 120px;
	}
	:global(.wx-comments-list .avatar-icon) {
		color: #fff !important;
	}
</style>
