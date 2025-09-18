<script>
	// svelte core
	import { getContext, untrack } from "svelte";
	const _ = getContext("wx-i18n").getGroup("editor");

	import { itemsToEditors } from "../editor";
	import { dataLink } from "./Helpers.svelte.js";

	// core widgets lib
	import { deepCopy, isSame } from "@svar-ui/lib-state";

	// incoming parameters
	let {
		values,
		items,
		css,
		activeBatch,
		autoSave,
		focus,
		readonly,
		topBar = true,
		bottomBar = true,
		layout = "default",
		placement = "inline",
		view: View,
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
							if (!x.activeSection) {
								editors.config.forEach(y => {
									if (
										y.comp === "section" &&
										y.key !== x.key
									) {
										y.activeSection = false;
									}
								});
								x.activeSection = true;
							}
						} else {
							x.activeSection = !x.activeSection;
						}
					}
				}
			});
		}

		let sections = new Set(),
			exclusive = null;

		editors.config.forEach(x => {
			if (x.sectionMode === "exclusive" && x.activeSection)
				exclusive = x.key;
			if (x.activeSection) sections.add(x.key);
		});

		editors.config.forEach(x => {
			x.hidden =
				x.hidden ||
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

	$effect.pre(() => {
		values;
		untrack(() => {
			actualValues = deepCopy(values);
			data = deepCopy(values);
		});
	});

	let d = dataLink(() => values && null);

	let notSaved = $state([]);
	// reset notSaved when values are changed
	$effect(() => values && (notSaved = []));

	function handleChanges({ value, key, input }) {
		data[key] = value;
		const event = {
			key,
			value,
			update: data,
		};
		if (input) event.input = input;
		onchange && onchange(event);

		if (!values) return;

		data = event.update;

		const changes = editors.diff(values, data);

		actualValues = editors.setValues(
			{ ...actualValues },
			data,
			getUniqueFields([...changes, key])
		);

		if (changes.length) {
			const fieldsToValidate = autoSave
				? []
				: getUniqueFields([
						...changes,
						...Object.keys(d.errors ?? {}),
						key,
					]);
			d.errors = runValidation(fieldsToValidate);
			handleUpdate(changes);
		} else {
			const errorsFields = Object.keys(d.errors ?? {});
			// if there are errors, we have to support validation of the fields that have errors
			if (errorsFields.length) d.errors = runValidation(errorsFields);
			notSaved = [];
		}
	}

	// when data is changed we send the "change" event outside
	// if autoSave is on and values are validated we save the changes and send the "save" event
	// otherwise we keep the changes in `notSaved` array
	function handleUpdate(changes) {
		if (autoSave && !d.errors) {
			editors.setValues(values, data, changes);
			onsave && onsave({ changes, values: actualValues });
		} else {
			notSaved = changes;
		}
	}

	function getUniqueFields(arr) {
		return [...new Set(arr)];
	}

	function runValidation(changes) {
		const check = editors.validateValues(actualValues, changes, _);

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
		if (!autoSave) d.errors = runValidation();
		if (!d.errors) {
			onsave &&
				onsave({
					changes: notSaved,
					values: actualValues,
				});
			editors.setValues(values, data, notSaved);
			notSaved = [];

			// it will be logical to receive the updated data from the parent
			// still, we can't be sure that external user will fullify this contract
			values = { ...actualValues };
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<View
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
	onkeydown={handleAction}
	onchange={handleChanges}
>
	{#if children}{@render children()}{/if}
</View>
