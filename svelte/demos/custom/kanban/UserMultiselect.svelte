<script>
	import { MultiCombo } from "wx-svelte-core";

	import UserIcon from "./UserIcon.svelte";

	let { value, onchange, options, ...restProps } = $props();
</script>

<MultiCombo {value} checkboxes {options} {onchange} {...restProps}>
	{#snippet children({ option })}
		<div class="wx-multiselect-option">
			<UserIcon data={option} />
			<span class="wx-multiselect-label">
				{option.label}
			</span>
		</div>
	{/snippet}
</MultiCombo>

<style>
	.wx-multiselect-option {
		display: flex;
		align-items: center;
	}

	.wx-multiselect-label {
		padding: 0 5px;
	}
</style>
