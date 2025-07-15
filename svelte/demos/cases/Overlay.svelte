<script>
	import { getData } from "../data";
	import { Form, Editor } from "../../src";

	const { items } = getData();
</script>

<div class="variations">
	<div>
		<h3>Overlay</h3>
		<div class="bg">
			<Form {items} readonly={true} />
		</div>
	</div>
	<div>
		<h3>Overlay for columns layout</h3>
		<div class="bg">
			<Editor
				{items}
				values={{ name: "Alex" }}
				layout="columns"
				readonly={true}
				css="overlay-editor"
			/>
		</div>
	</div>
</div>

<style>
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
	.bg :global(.overlay-editor .wx-cols .wx-left) {
		min-width: 150px;
		width: 150px;
	}
	.bg :global(.overlay-editor .wx-cols .wx-right) {
		min-height: 100px;
		width: 150px;
	}
</style>
