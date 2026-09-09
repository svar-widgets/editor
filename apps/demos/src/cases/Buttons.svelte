<script lang="ts">
	import { getData } from "../data";
	import { Editor } from "@svar-ui/svelte-editor";

	const { items, values } = getData();

	let message = $state("");

	function handleClick({ item }: any) {
		message = "click: " + item.id;
	}
	function buttonClick({ id }: any) {
		message = "button: " + id;
	}
</script>

<div class="message">{message}</div>
<div class="variations">
	<div>
		<h3>None</h3>
		<div class="bg">
			<Editor topBar={false} {items} {values} />
		</div>
	</div>
	<div>
		<h3>Top Bar</h3>
		<div class="bg">
			<Editor {items} {values} onaction={handleClick} />
		</div>
	</div>
	
	<div>
		<h3>Top Bar, Mixed</h3>
		<div class="bg">
			<Editor
				topBar={{
					items: [
						{
							comp: "button",
							type: "primary",
							text: "Save",
							id: "save",
						},
						{ comp: "spacer" },
						{ comp: "icon", icon: "wxi-refresh", id: "refresh" },
						{ comp: "icon", icon: "wxi-delete", id: "delete" },
					],
				}}
				{items}
				{values}
				onaction={handleClick}
			/>
		</div>
	</div>
	<div>
		<h3>Bottom Bar</h3>
		<div class="bg">
			<Editor
				bottomBar={{
					items: [
						{
							comp: "button",
							type: "primary",
							text: "Save",
							id: "save",
						},
						{ comp: "button", text: "Cancel", id: "cancel" },
					],
				}}
				{items}
				{values}
				onaction={handleClick}
			/>
		</div>
	</div>
	<div>
		<h3>Action menu</h3>
		<div class="bg">
			<Editor
				topBar={{
					items: [
						{
							comp: "label",
							spacer: true,
							text: "Item X12-A",
						},
						{ comp: "separator" },
						{
							icon: "wxi-dots-v",
							collapsed: true,
							layout: "column",
							items: [
								{
									id: "done",
									comp: "item",
									text: "Mark as done",
									handler: buttonClick,
								},
								{
									id: "delete",
									comp: "button",
									type: "danger",
									text: "Delete the item",
									handler: buttonClick,
								},
							],
						},
					],
				}}
				{items}
				{values}
				onaction={handleClick}
			/>
		</div>
	</div>
</div>

<style>
	.message {
		padding: 5px 10px;
		background-color: #eee;
		color: #444;
		line-height: 33px;
		height: 40px;
	}
	.variations {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.variations > div {
		margin: 0 10px 60px 20px;
		width: 400px;
	}
	.bg {
		border: 1px solid #ccc;
		box-shadow: 0 0 5px #ccc;
		padding: 10px;
		height: 100%;
	}
</style>
