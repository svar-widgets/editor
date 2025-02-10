<script>
	import { Form } from "../../src";
	import { getData } from "../data";

	let { itemsValidation: items, valuesValidation: values } = getData();
</script>

<div style="padding: 10px;">
	<h3>Form with validation and error messages</h3>
	<div class="bg">
		<Form {items} {values} autoApply={false} />
	</div>
</div>

<style>
	.bg {
		border-top: 1px solid #ccc;
		padding: 10px;
		height: 100%;
	}
</style>
