<script>
	import { Combo } from "@svar-ui/svelte-core";
	import UserIcon from "./UserIcon.svelte";

	let { value, options, onchange, ...restProps } = $props();
</script>

<Combo {value} {options} {onchange} {...restProps}>
	{#snippet children({ option })}
		<div class="wx-combo-option">
			{#if option.color}
				<div class="wx-color" style="background:{option.color}"></div>
			{:else if option.avatar || option.avatarColor}
				<UserIcon data={option} />
			{/if}
			{option.label}
		</div>
	{/snippet}
</Combo>

<style>
	.wx-combo-option {
		display: flex;
		align-items: center;
	}
	.wx-color {
		border-radius: 50%;
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}
</style>
