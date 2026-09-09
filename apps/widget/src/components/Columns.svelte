<script lang="ts">
	import Editor from "./FormEditor.svelte";
	import type {
		IEditorsConfig,
		TValues,
		TErrors,
		TChangeHandler,
		TActionHandler,
	} from "../types.js";

	interface Props {
		editors: IEditorsConfig;
		data: TValues;
		layout?: string;
		errors?: TErrors;
		focus?: boolean;
		readonly?: boolean;
		onclick?: TActionHandler;
		onchange?: TChangeHandler;
	}
	let { editors, data, layout, errors, focus, readonly, onclick, onchange }: Props =
		$props();

	let columns = $derived.by<any[]>(() => {
		let cols: any[] = [];
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
			<Editor editors={columns[0]} {readonly} {data} {errors} {onclick} {onchange} />
		</div>
		<div class="wx-right">
			<Editor
				editors={columns[1]}
				{data}
				{focus}
				{readonly}
				{errors}
				{onclick}
				{onchange}
			/>
		</div>
	</div>
{:else}
	<Editor {editors} {data} {focus} {readonly} {errors} {onclick} {onchange} />
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
