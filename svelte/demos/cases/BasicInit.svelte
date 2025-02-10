<script>
	import { getData } from "../data";
	import { Form } from "../../src";

	const { items, values } = getData();
</script>

<div class="variations">
	<div>
		<h3>Normal</h3>
		<div class="bg">
			<Form {items} {values} />
		</div>
	</div>
	<div>
		<h3>Readonly</h3>
		<div class="bg">
			<Form {items} {values} readonly={true} />
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
</style>
