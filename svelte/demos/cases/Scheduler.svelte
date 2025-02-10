<script>
	import { Editor, registerEditorItem } from "../../src";

	import { RadioButtonGroup } from "wx-svelte-core";

	import DateTimePicker from "../custom/scheduler/DateTimePicker.svelte";
	import Combo from "../custom/scheduler/Combo.svelte";
	import Multiselect from "../custom/scheduler/Multiselect.svelte";
	import MultiselectOption from "../custom/scheduler/templates/MultiselectOption.svelte";
	import ComboOption from "../custom/scheduler/templates/ComboOption.svelte";
	import ColorPickerSchema from "../custom/scheduler/ColorPickerSchema.svelte";
	import Uploader from "../custom/scheduler/Uploader.svelte";

	registerEditorItem("date-time-picker", DateTimePicker);
	registerEditorItem("sheduler-multiselect", Multiselect);
	registerEditorItem("sheduler-combo", Combo);
	registerEditorItem("radio-group", RadioButtonGroup);
	registerEditorItem("color-schema", ColorPickerSchema);
	registerEditorItem("files", Uploader);

	let events = $state([
		{
			id: "2",
			type: "work",
			start_date: new Date("2022-05-24T00:00:00"),
			end_date: new Date("2022-06-08T00:00:00"),
			text: "Color from data",
			color: { background: "#DC9F54", border: "#B87728" },
			details: "This color is set from data",
			allDay: false,
			arr: "",
			files: [],
		},
		{
			id: "221",
			type: "work",
			start_date: new Date("2022-06-07T00:00:00"),
			end_date: new Date("2022-06-13T00:00:00"),
			text: "French Open",
			details: "Philippe-Chatrier Court\n Paris, FRA",
			allDay: false,
			arr: "",
			files: [],
		},
		{
			id: "3",
			type: "work",
			start_date: new Date("2022-06-10T00:00:00"),
			end_date: new Date("2022-06-14T00:00:00"),
			text: "Aegon Championship",
			details: "The Queens Club\n London, ENG",
			allDay: false,
			arr: "",
			files: [],
		},
	]);

	const listItems = [
		{
			key: "text",
			comp: "text",
			label: "Event name",
			config: {
				placeholder: "New Event",
			},
		},
		{
			comp: "date-time-picker",
			key: "start_date",
			label: "Start date",
			time: true,
			config: {
				buttons: false,
			},
		},
		{
			comp: "date-time-picker",
			key: "end_date",
			label: "End date",
			time: true,
			config: {
				buttons: false,
			},
		},
		{
			comp: "sheduler-combo",
			key: "type",
			label: "Type",
			options: [
				{
					color: { background: "#3AA3E3", border: "#098CDC" },
					id: "work",
					active: true,
					label: "Work",
				},
				{
					color: { background: "#9585EF", border: "#7A67EB" },
					id: "meeting",
					active: true,
					label: "Meeting",
				},
				{
					color: { background: "#BD69BC", border: "#AD44AB" },
					id: "rest",
					active: true,
					label: "Rest",
				},
				{
					color: { background: "#84BF70", border: "#61A649" },
					id: "movie",
					active: true,
					label: "Movie",
				},
			],
			template: ComboOption,
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
			comp: "sheduler-multiselect",
			key: "arr",
			label: "Multiselect",
			options: [
				{
					label: "AC/DC",
					id: "a",
					img: "https://i1.sndcdn.com/avatars-hyJEwQzyBwczTEfs-UmFlag-t500x500.jpg",
				},
				{
					label: "Metallica",
					id: "m",
					img: "https://headbangkok.com/wp-content/uploads/2021/05/metallica.jpg",
				},
				{
					label: "Scorpions",
					id: "s",
					img: "https://i.ytimg.com/vi/syNDdIfKbkw/maxresdefault.jpg",
				},
				{
					label: "Muse",
					id: "mu",
					img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbtGXvZF-oc3YFOgP9FJXg8eTV8TEzbKKwOw&usqp=CAU",
				},
			],
			template: MultiselectOption,
		},
		{
			comp: "radio-group",
			key: "radio",
			label: "Radio Group",
			options: [
				{
					value: "s",
					label: "Scorpions",
				},
				{
					value: "m",
					label: "Muse",
				},
			],
		},
		{
			comp: "color-schema",
			key: "color",
			label: "Color",
			colors: [
				{ background: "#5890DC", border: "#2D74D3" },
				{ background: "#84BF70", border: "#61A649" },
				{ background: "#BD69BC", border: "#AD44AB" },
				{ background: "#FF8750", border: "#BD4E1B" },
				{ background: "#7366CC", border: "#4536AD" },
				{ background: "#454555", border: "#363645" },
				{ background: "#3AA3E3", border: "#098CDC" },
				{ background: "#009492", border: "#157B7A" },
				{ background: "#CB61C8", border: "#9E3C9C" },
				{ background: "#DC9F54", border: "#B87728" },
				{ background: "#3537A6", border: "#282A8A" },
				{ background: "#006ECC", border: "#045AA3" },
				{ background: "#009C5A", border: "#04864F" },
				{ background: "#E94C93", border: "#AC3C6E" },
				{ background: "#E67400", border: "#B65F06" },
				{ background: "#3E3A98", border: "#36337E" },
				{ background: "#0054B4", border: "#014593" },
				{ background: "#005A3A", border: "#054830" },
				{ background: "#E54D54", border: "#BA282E" },
				{ background: "#9585EF", border: "#7A67EB" },
				{ background: "#3D446F", border: "#2A2F50" },
			],
		},
		{
			key: "files",
			comp: "files",
			label: "Attachments",
			config: {
				multiple: true,
			},
			uploadURL: "/uploads",
		},
	];

	function handleClick({ item, values }) {
		const actionId = item.id;
		const id = values.id;
		if (actionId === "delete") {
			events = events.filter(t => t.id !== id);
		}
		activeEvent = null;
	}

	let activeEvent = $state(null);

	function selectActive(data) {
		activeEvent = data;
	}

	const refresh = ({ values }) => {
		const ind = events.findIndex(d => d.id === values.id);
		events[ind] = values;
	};
</script>

<h4 style="margin-left: 20px;">Imitation of scheduler events</h4>

<div class="events">
	{#each events as data}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="item"
			onclick={() => selectActive(data)}
			class:active={activeEvent?.id === data.id}
		>
			<div class="content">{data.text}</div>
		</div>
	{/each}
</div>

{#if activeEvent}
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
		values={activeEvent}
		onaction={handleClick}
		onsave={refresh}
	/>
{/if}

<style>
	.events {
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
