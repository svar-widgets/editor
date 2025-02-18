<script>
	// svelte core
	import { getContext, untrack } from "svelte";
	const _ = getContext("wx-i18n").getGroup("editor");

	import { itemsToEditors } from "../editor";
	import { dataLink } from "./Helpers.svelte.js";

	// core widgets lib
	import { Locale } from "wx-svelte-core";
	import { deepCopy, isSame } from "wx-lib-state";
	import en from "../en.js";

	// incoming parameters
	let {
		values,
		items,
		css,
		activeBatch,
		autoSave,
		readonly,
		topBar = true,
		bottomBar = true,
		layout = "default",
		placement = "inline",
		view,
		children,
		onchange,
		onsave,
		onaction,
		onvalidation,
	} = $props();

	// mark hidden items
	let activatedSection = $state(null);
	const editors = $derived.by(() => {
		const editors = itemsToEditors(items);

		if (activatedSection) {
			editors.config.forEach(x => {
				if (x.comp === "section") {
					if (x.key === activatedSection) {
						if (x.sectionMode === "accordion") {
							if (!x.active) {
								editors.config.forEach(y => {
									if (
										y.comp === "section" &&
										y.key !== x.key
									) {
										y.active = false;
									}
								});
								x.active = true;
							}
						} else {
							x.active = !x.active;
						}
					}
				}
			});
		}

		let sections = new Set(),
			exclusive = null;

		editors.config.forEach(x => {
			if (x.sectionMode === "exclusive" && x.active) exclusive = x.key;
			if (x.active) sections.add(x.key);
		});

		editors.config.forEach(x => {
			x.hidden =
				(activeBatch && activeBatch !== x.batch) ||
				(exclusive && x.key != exclusive && x.section !== exclusive) ||
				(x.section && !sections.has(x.section));
		});
		if (readonly) {
			return {
				...editors,
				config: editors.config.map(s => ({ ...s, comp: "readonly" })),
				diff: () => [],
			};
		}
		return editors;
	});

	let actualValues = $state({});
	let data = $state({});

	$effect(() => {
		values;
		untrack(() => {
			actualValues = deepCopy(values);
			data = deepCopy(values);
		});
	});

	let d = dataLink(() => values && null);

	let notSaved = [];
	// reset notSaved when values are changed
	$effect(() => values && (notSaved = []));

	function handleChanges({ value, key }) {
		data[key] = value;
		onchange &&
			onchange({
				key,
				value,
				update: data,
			});

		const changes = editors.diff(values, data);

		actualValues = editors.setValues({ ...actualValues }, data, [key]);
		d.errors = runValidation(actualValues);
		if (changes.length) handleUpdate(changes, data);
	}

	// when data is changed we send the "change" event outside
	// if autoSave is on we save the changes and send the "save" event
	// if autoSave is off we keep the changes in `notSaved` array
	function handleUpdate(changes) {
		if (autoSave) {
			if (!d.errors) {
				onsave &&
					onsave({ changes, values: actualValues, errors: d.errors });
				editors.setValues(values, data, changes);
			}
		} else {
			notSaved = changes;
		}
	}

	function runValidation() {
		const check = editors.validateValues(actualValues, _);

		if (!isSame(check, d.errors)) {
			onvalidation &&
				onvalidation({ errors: check, values: actualValues });
		}

		return check;
	}

	function handleAction({ item }) {
		if (item.id === "save") {
			saveAction();
		} else if (item.id === "toggle-section") {
			activatedSection = item.key;
		}
		onaction && onaction({ item, values: actualValues, changes: notSaved });
	}

	function saveAction() {
		if (!notSaved.length) return;
		if (!d.errors) {
			onsave &&
				onsave({
					changes: notSaved,
					values: actualValues,
					errors: d.errors,
				});
			editors.setValues(values, data, notSaved);
			notSaved = [];

			// it will be logical to receive the updated data from the parent
			// still, we can't be sure that external user will fullify this contract
			values = { ...actualValues };
		}
	}
</script>

<Locale words={en} optional={true}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	{@const SvelteComponent = view}
	<SvelteComponent
		{topBar}
		{bottomBar}
		{placement}
		{layout}
		{readonly}
		{autoSave}
		{css}
		{data}
		{editors}
		{focus}
		errors={d.errors}
		onclick={handleAction}
		onchange={handleChanges}
	>
		{#if children}{@render children()}{/if}
	</SvelteComponent>
</Locale>
