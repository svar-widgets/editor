<script lang="ts">
	import { Editor } from "@svar-ui/svelte-editor";
	import { getData } from "../data";

	let { itemsValidation: items, valuesValidation: values } = getData();

	const resetName = () => {
		// trigger validation
		setTimeout(() => {
			const input = document.querySelector(
				".wx-editor .wx-text input",
			) as HTMLInputElement;

			input.value = "";
			input.dispatchEvent(
				new InputEvent("input", {
					inputType: "deleteContentBackward",
					bubbles: true,
				}),
			);
			input.focus();
		}, 500);
	};
	resetName();
</script>

<div style="padding: 10px;">
	<Editor {items} {values} topBar={false} />
</div>

