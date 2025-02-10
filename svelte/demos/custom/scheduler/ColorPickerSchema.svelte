<script>
	import { ColorSelect } from "wx-svelte-core";
	import { form } from "wx-lib-svelte";

	let {
		colors,
		clear = false,
		placeholder = null,
		onchange,
		value,
	} = $props();

	let colorpicker = $derived(value?.colorpicker || "border");

	const values = form({}, val => {
		const upd = {
			...colors.find(c => c[c.colorpicker || "border"] === val.color),
		};
		onchange && onchange({ value: upd });
	});

	$effect.pre(() => {
		values.reset({ color: value?.[colorpicker] || "" });
	});
	let mapedColors = $derived(colors.map(c => c[c.colorpicker || "border"]));
</script>

<ColorSelect
	value={$values.color}
	colors={mapedColors}
	{placeholder}
	clear={clear || false}
/>
