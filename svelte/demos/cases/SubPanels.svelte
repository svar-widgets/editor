<script>
	import { getData, sectionItems, onlySectionItems } from "../data";
	import { Form, registerEditorItem } from "../../src";

	import { Comments } from "wx-svelte-comments";
	import { Tasklist } from "wx-svelte-tasklist";

	registerEditorItem("comments", Comments);
	registerEditorItem("tasks", Tasklist);

	const { values } = getData();

	const items1 = sectionItems();
	const items2 = sectionItems({ sectionMode: "exclusive" });
	const items3 = onlySectionItems();
	const items4 = onlySectionItems({ sectionMode: "accordion" });
</script>

<div class="variations">
	<div class="bg-top">
		<h3>Normal sections</h3>
		<Form items={items1} {values} />
	</div>
	<div class="bg-top">
		<h3>Exclusive mode</h3>
		<Form items={items2} {values} />
	</div>
	<div class="bg">
		<h3>Normal sections</h3>
		<Form items={items3} {values} />
	</div>
	<div class="bg">
		<h3>Accordion mode</h3>
		<Form items={items4} {values} />
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
	.bg-top {
		padding: 10px;
		height: 100%;
	}
	.bg {
		border-top: 1px solid #ccc;
		padding: 10px;
		height: 100%;
	}
</style>
