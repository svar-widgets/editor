<script>
	import { DatePicker, TimePicker, Switch } from "@svar-ui/svelte-core";

	let { value, error, onchange } = $props();

	const update = part => onchange({ value: { ...value, ...part } });

	const midnight = d => {
		if (!d) return d;
		const out = new Date(d);
		out.setHours(0, 0, 0, 0);
		return out;
	};

	// calendar returns the picked day at midnight; keep the current time part
	function pickDate(key, day) {
		const current = value[key];
		let next = day;
		if (day && current && !value.isFullDay) {
			next = new Date(day);
			next.setHours(current.getHours(), current.getMinutes(), 0, 0);
		}
		update({ [key]: next });
	}

	// time picker returns hours/minutes only; keep the current date part
	function pickTime(key, time) {
		const current = value[key];
		if (!current) return;
		const next = new Date(current);
		next.setHours(time.getHours(), time.getMinutes(), 0, 0);
		update({ [key]: next });
	}

	function toggleFullDay({ value: isFullDay }) {
		// switching to all-day snaps both dates to midnight
		update(
			isFullDay
				? {
						isFullDay,
						start: midnight(value.start),
						end: midnight(value.end),
					}
				: { isFullDay }
		);
	}
</script>

<div class="wx-event-dates" class:wx-error={!!error}>
	<div class="wx-date">
		<DatePicker
			value={value.start}
			onchange={ev => pickDate("start", ev.value)}
		/>
	</div>
	{#if !value.isFullDay}
		<div class="wx-time">
			<TimePicker
				value={value.start}
				onchange={ev => pickTime("start", ev.value)}
			/>
		</div>
	{/if}
	<span>&mdash;</span>
	<div class="wx-date">
		<DatePicker
			value={value.end}
			onchange={ev => pickDate("end", ev.value)}
		/>
	</div>
	{#if !value.isFullDay}
		<div class="wx-time">
			<TimePicker
				value={value.end}
				onchange={ev => pickTime("end", ev.value)}
			/>
		</div>
	{/if}
	<label class="wx-full-day">
		<Switch value={value.isFullDay} onchange={toggleFullDay} />
		All day
	</label>
</div>

<style>
	.wx-event-dates {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.wx-date {
		flex: 1;
	}
	.wx-time {
		flex: none;
		width: 96px;
	}
	.wx-full-day {
		display: flex;
		align-items: center;
		gap: 6px;
		white-space: nowrap;
		cursor: pointer;
	}
	.wx-error :global(input) {
		border-color: var(--wx-color-danger);
	}
</style>
