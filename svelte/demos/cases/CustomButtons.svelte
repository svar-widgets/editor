<script>
	import { getData } from "../data";
	import { Editor } from "../../src";

	const { items, values } = getData();

	let message = $state("");

	function handleClick({ item }) {
		message = "click: " + item.id;
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
		<h3>Top Bar, Right</h3>
		<div class="bg">
			<Editor
				topBar={{
					items: [
						{ comp: "spacer" },
						{ comp: "button", text: "Save", id: "save" },
					],
				}}
				{items}
				{values}
				onaction={handleClick}
			/>
		</div>
	</div>
	<div>
		<h3>Top Bar, Left</h3>
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
					],
				}}
				{items}
				{values}
				onaction={handleClick}
			/>
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
