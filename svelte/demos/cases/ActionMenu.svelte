<script>
	import { getData } from "../data";
	import { Editor } from "../../src";

	const { items, values } = getData();

	let message = $state("");

	function buttonClick(e) {
		message = "button: " + e.id;
	}
</script>

<div class="message">{message}</div>
<div class="variations">
	<div>
		<h3>Top Bar, Right</h3>
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
			/>
		</div>
	</div>
</div>

<style>
	.bg :global(.wx-topbar) {
		border-bottom: 1px solid #ccc;
	}
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
