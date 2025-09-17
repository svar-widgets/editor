<script>
	import { getContext } from "svelte";
	import { Field } from "@svar-ui/svelte-core";

	const _ = getContext("wx-i18n").getGroup("editor");

	let { value, options, label } = $props();

	let text = $derived.by(() => {
		let text = value;
		if (typeof value === "boolean") {
			text = value ? _("Yes") : _("No");
		}

		if (options) {
			const option = options.find(o => o.id === value);
			if (option) {
				text = option.label;
			}
		}

		return text;
	});
</script>

{#if text || text === 0}
	<Field {label}>{text}</Field>
{/if}
