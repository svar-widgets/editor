<script>
	import { getData } from "../data";
	import { Form, Editor } from "../../src";
	import { Segmented, Tabs } from "wx-svelte-core";

	import { registerToolbarItem, Toolbar } from "wx-svelte-toolbar";
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
	<div>
		<h3>Segmented</h3>
		<div class="bg">
			<Form topBar={[]} items={batchItems} {values} {activeBatch}>
				<div class="top">
					<Segmented {options} bind:value={activeBatch}></Segmented>
				</div>
			</Form>
		</div>
	</div>
	<div>
		<h3>Tabbar</h3>
		<div class="bg">
			<Form topBar={[]} items={batchItems} {values} {activeBatch}>
				<div class="top">
					<Tabs {options} bind:value={activeBatch}></Tabs>
				</div>
			</Form>
		</div>
	</div>
	<div>
		<h3>Toolbar</h3>
		<div class="bg">
			<Editor
				items={batchItems}
				{values}
				{activeBatch}
				bottomBar={{
					items: [
						{ comp: "spacer" },
						{ comp: "button", text: "Cancel", id: "cancel" },
						{
							comp: "button",
							type: "primary",
							text: "Save",
							id: "save",
						},
					],
				}}
			>
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
	.bg {
		border-top: 1px solid #ccc;
		padding: 10px;
		height: 100%;
	}
</style>
