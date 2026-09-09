<script>
	import { Editor, registerEditorItem } from "@svar-ui/svelte-editor";
	import EventDates from "../custom/EventDates.svelte";

	registerEditorItem("event-dates", EventDates);

	const items = [
		{ comp: "text", key: "name", label: "Name" },
		{
			comp: "event-dates",
			key: "dates",
			keys: ["start", "end", "isFullDay"],
			label: "Event dates",
			validation: v => !v.start || !v.end || v.end >= v.start,
			validationMessage: "End date must be after the start date",
		},
		{ comp: "textarea", key: "descr", label: "Description" },
	];

	const values = $state({
		name: "Project kickoff",
		start: new Date(2026, 5, 10, 9),
		end: new Date(2026, 5, 10, 11),
		isFullDay: false,
		descr: "Initial planning meeting",
	});

	let message = $state("");
	function handleSave({ changes, values: next }) {
		message = `saved fields: ${changes.join(", ")}`;
		Object.assign(values, next);
	}
</script>

<div style="padding: 10px; max-width: 700px;">
	<Editor {items} {values} topBar={false} autoSave={true} onsave={handleSave} />
	{#if message}
		<div class="status">{message}</div>
	{/if}
</div>

<style>
	.status {
		margin: 10px 20px;
		font-size: 14px;
		color: var(--wx-color-primary);
	}
</style>
