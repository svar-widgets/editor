<script>
	import { getData } from "../data";
	import { Editor } from "/src";

	let { itemsValidation: items, valuesValidation } = getData();

	let visible = $state(true);
	let values = $state(valuesValidation);

	function handleClick({ item, changes }) {
		// need to check that there are changes and close editor after successful validation
		// otherwise, even if "save" event is not triggered, editor will be closed anyway
		// but we still can close editor if there are not any changes
		if (item.id === "save" && changes.length) return;
		visible = false;
	}

	function handleSave(ev) {
		values = ev.values;
		visible = false;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="data" onclick={() => (visible = true)} class:active={visible}>
	{#each Object.values(values) as value}
		<span>{value}</span>
	{/each}
</div>

{#if visible}
	<Editor
		placement={"sidebar"}
		autoSave={false}
		{items}
		{values}
		onaction={handleClick}
		onsave={handleSave}
	/>
{/if}

<style>
	.data {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-left: 20px;
		width: 400px;
		border: var(--wx-border);
		border-radius: 3px;
		padding: 10px;
		margin: 20px;
	}

	.data.active {
		border: 1px solid var(--wx-color-primary);
	}
</style>
