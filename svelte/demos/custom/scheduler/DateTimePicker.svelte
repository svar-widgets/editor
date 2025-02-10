<script>
	import { DatePicker, TimePicker } from "wx-svelte-core";

	let { value, id, time, onchange, ...restProps } = $props();
</script>

<div class="wx-event-calendar-date_field">
	<div class="wx-event-calendar-input_wrapper">
		<DatePicker {id} {value} {onchange} {...restProps} buttons={false} />
	</div>
	{#if time}
		<TimePicker {id} {value} {onchange} />
	{/if}
</div>

<style>
	.wx-event-calendar-date_field {
		display: flex;
	}
	.wx-event-calendar-date_field .wx-event-calendar-input_wrapper {
		flex-grow: 2;
	}
	.wx-event-calendar-date_field :global(.timepicker) {
		width: unset !important;
	}
	.wx-event-calendar-input_wrapper {
		margin-right: 10px;
	}
	:global(.wx-event-calendar-editor-controls > .btn:not(:last-child)) {
		margin-right: 5px;
	}
</style>
