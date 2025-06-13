<script>
	import Editor from "./FormEditor.svelte";

	let { editors, data, layout, errors, focus, onclick, onchange } = $props();

	let columns = $derived.by(() => {
		let cols = [];
		if (layout === "columns") {
			cols = [
				{ ...editors, config: [] },
				{ ...editors, config: [] },
			];
			editors.config.forEach(field => {
				const index = field.column === "left" ? 0 : 1;
				cols[index].config.push(field);
			});

			if (cols[0].config.length) {
				const obj = cols[0].config[0];
				if (obj.comp === "text") {
					cols[0][0] = {
						...obj,
						css: "title",
						label: "",
					};
				}
			}
		}
		return cols;
	});
</script>

{#if layout === "columns"}
	<div class="wx-cols">
		<div class="wx-left">
			<Editor editors={columns[0]} {data} {errors} {onclick} {onchange} />
		</div>
		<div class="wx-right">
			<Editor
				editors={columns[1]}
				{data}
				{focus}
				{errors}
				{onclick}
				{onchange}
			/>
		</div>
	</div>
{:else}
	<Editor {editors} {data} {focus} {errors} {onclick} {onchange} />
{/if}

<style>
	.wx-cols {
		max-height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.wx-left {
		min-width: 640px;
		overflow-y: auto;
	}
	.wx-right {
		width: 364px;
		min-height: 400px;
		margin-left: 30px;
		background: var(--wx-background-alt);
		overflow-y: auto;
	}
</style>
