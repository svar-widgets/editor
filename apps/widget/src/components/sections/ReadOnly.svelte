<script lang="ts">
	import { getContext } from "svelte";
	import { Field } from "@svar-ui/svelte-core";
	import { dateToString } from "@svar-ui/lib-dom";
	import type { TID, IWxI18n } from "../../types.js";

	const ctx = getContext<IWxI18n>("wx-i18n");
	const _ = ctx.getGroup("editor");
	const { calendar, formats } = ctx.getRaw() as { calendar: any; formats: any };

	interface Props {
		value?: any;
		options?: { id: TID; label: string }[];
		label?: string;
	}
	let { value, options, label, format }: Props = $props();

	let text = $derived.by(() => {
		let text = value;
		if (typeof value === "boolean") {
			text = value ? _("Yes") : _("No");
		}

		if (value instanceof Date) {
			const f = format || formats.dateFormat;
			text = dateToString(f, calendar)(value);
		}

		if (options) {
			text = (Array.isArray(value) ? value : [value])
				.map(id => options.find(o => o.id === id)?.label)
				.filter(o => o !== undefined)
				.join(", ");
		}

		return text;
	});
</script>

{#if text || text === 0}
	<Field {label}>{text}</Field>
{/if}
