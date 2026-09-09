<script lang="ts">
	import { getData } from "../data";
	import { Editor } from "@svar-ui/svelte-editor";
	import { Segmented, Tabs } from "@svar-ui/svelte-core";

	import { registerToolbarItem, Toolbar } from "@svar-ui/svelte-toolbar";
	registerToolbarItem("segmented", Segmented);

	const { batchItems, values } = getData();

	let options = [
		{
			id: "main",
			label: "Personal",
		},
		{
			id: "cfg",
			label: "Settings",
		},
	];

	let activeBatch = $state("main");
	let toolbarValues = $derived({ batch: activeBatch });
</script>

<div class="variations">
	<div class="bg-top">
		<h3>Segmented</h3>
		<Editor topBar={false} items={batchItems} {values} {activeBatch}>
			<div class="top" style="margin-left: 20px;">
				<Segmented {options} bind:value={activeBatch}></Segmented>
			</div>
		</Editor>
	</div>
	<div class="bg-top">
		<h3>Tabbar</h3>
		<div class="bg" style="height: 400px;">
			<Editor
				topBar={false}
				items={batchItems}
				{values}
				{activeBatch}
			>
				<div class="top">
					<Tabs {options} bind:value={activeBatch}></Tabs>
				</div>
			</Editor>
		</div>
	</div>
	<div class="bg-top">
		<h3>Toolbar</h3>
		<Editor items={batchItems} {values} {activeBatch} topBar={false}>
			<Toolbar
				values={toolbarValues}
				items={[
					{ comp: "icon", icon: "wxi-refresh" },
					{ comp: "spacer" },
					{ key: "batch", comp: "segmented", options },
				]}
				onchange={({ value, item }) => {
					if (item.key === "batch") activeBatch = value;
				}}
			/>
		</Editor>
	</div>
</div>

<style>
	.top {
		margin-bottom: 10px;
	}
	.variations {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.variations > div {
		margin: 0 20px 60px 20px;
		width: 400px;
	}
	h3 {
		margin-bottom: 10px;
		margin-left: 22px;
	}
</style>
