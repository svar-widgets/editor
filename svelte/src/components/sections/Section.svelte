<script>
	let { key, label, activeSection, onclick } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="wx-section"
	class:wx-section-active={activeSection}
	onclick={() =>
		onclick &&
		onclick({
			item: { id: "toggle-section", key: activeSection ? null : key },
		})}
>
	<h3>{label}</h3>
	<i class={`wxi-angle-${activeSection ? "down" : "right"} wx-icon`}></i>
</div>

<style>
	.wx-section {
		position: relative;
		border-bottom: 1px solid #ccc;
		cursor: pointer;
		padding: 6px;
	}
	.wx-section-active {
		background-color: var(--wx-background-alt);
		padding-bottom: 0px;
		margin-bottom: 10px;
	}
	.wx-section .wx-icon {
		position: absolute;
		right: 10px;
		top: 20px;
		font-size: 25px;
	}
</style>
