<script>
	let {
		data = {},
		noTransform = false,
		size = "normal",
		border = true,
	} = $props();

	let firstLetters = $derived(
		data.label
			.split(" ")
			.map(label => label[0])
			.join("")
	);

	let style = $derived.by(() => {
		if (data.avatarColor) {
			return `background: ${data.avatarColor}; color: var(--wx-color-primary-font);`;
		}
		return "";
	});
</script>

<div class="wx-user {size}" class:border {style}>
	{#if data.avatar}
		<img src={data.avatar} alt={data.label} />
	{:else if noTransform}{data.label}{:else}{firstLetters}{/if}
</div>

<style>
	.wx-user {
		border-radius: 50%;
		background: var(--wx-kanban-background);

		color: var(--wx-color-font);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		background: var(--wx-kanban-background);
	}

	.wx-user.normal {
		width: 36px;
		height: 36px;
		font-size: var(--wx-font-size);
	}

	.wx-user.small {
		width: 28px;
		height: 28px;
		font-size: var(--wx-font-size-sm);
	}

	.wx-user img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.wx-user:not(:global(:first-child)) {
		margin-left: -15px;
	}
</style>
