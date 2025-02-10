<script>
	let { option = {} } = $props();
</script>

<div class="wx-event-calendar-combo-option">
	<span>{option.label}</span>
	{#if option.color}
		<div
			class="wx-event-calendar-color"
			style="background:{option.color.border}"
		></div>
	{/if}
</div>

<style>
	.wx-event-calendar-combo-option {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.wx-event-calendar-color {
		width: 10px;
		height: 10px;
	}
</style>
