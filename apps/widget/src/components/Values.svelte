<script lang="ts">
	// svelte core
	import { getContext, untrack } from "svelte";
	import type {
		IItemConfig,
		IEditorsConfig,
		TValues,
		TErrors,
		TID,
		TBar,
		THotkeys,
		TView,
		IWxI18n,
		IFieldChange,
		Snippet,
		TChangeHandler,
		TSaveHandler,
		TActionResultHandler,
		TValidationHandler,
	} from "../types.js";
	const _ = getContext<IWxI18n>("wx-i18n").getGroup("editor");

	import { itemsToEditors } from "../helpers/editor.js";
	import { dataLink } from "./Helpers.svelte.js";

	// core widgets lib
	import { deepCopy, isSame } from "@svar-ui/lib-state";

	interface Props {
		values?: TValues;
		items?: IItemConfig[];
		css?: string;
		activeBatch?: string | null;
		autoSave?: boolean;
		focus?: boolean;
		readonly?: boolean;
		topBar?: TBar;
		bottomBar?: TBar;
		layout?: string;
		placement?: string;
		view: TView;
		children?: Snippet;
		onchange?: TChangeHandler;
		onsave?: TSaveHandler;
		onaction?: TActionResultHandler;
		onvalidation?: TValidationHandler;
		hotkeys?: THotkeys;
	}

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
		hotkeys,
	}: Props = $props();

	// mark hidden items
	let activatedSection = $state<TID | null>(null);
	const editors = $derived.by<IEditorsConfig>(() => {
		const editors = itemsToEditors(items ?? []);

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

		let sections = new Set<TID>(),
			exclusive: TID | null = null;

		editors.config.forEach(x => {
			if (x.sectionMode === "exclusive" && x.activeSection)
				exclusive = x.key;
			if (x.activeSection) sections.add(x.key);
		});

		editors.config.forEach(x => {
			x.hidden = !!(
				x.hidden ||
				(activeBatch && activeBatch !== x.batch) ||
				(exclusive && x.key != exclusive && x.section !== exclusive) ||
				(x.section && !sections.has(x.section))
			);
		});
		if (readonly) {
			return {
				...editors,
				diff: () => [],
			};
		}
		return editors;
	});

	let actualValues = $state<TValues>({});
	let data = $state<TValues>({});

	let d = dataLink<TErrors>(() => (values && null) as TErrors);

	$effect.pre(() => {
		const nextValues = values;
		untrack(() => {
			actualValues = deepCopy(nextValues) as TValues;
			data = deepCopy(nextValues) as TValues;
			// multi-field items keep a composite object under the item key,
			// which does not exist in the raw values shape
			if (data) {
				editors.config.forEach(ed => {
					if (ed.keys?.length) data[ed.key] = ed.getter(data);
				});
			}
			if (d.errors)
				d.errors = runValidation([]);
		});
	});

	let notSaved = $state<TID[]>([]);
	// reset notSaved when values are changed
	$effect(() => {
		if (values) notSaved = [];
	});

	function handleChanges({ value, key, input }: IFieldChange) {
		data[key] = value;
		const event: IFieldChange = {
			key,
			value,
			update: data,
		};
		if (input) event.input = input;
		onchange?.(event);

		if (!values) return;

		data = event.update!;

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
	function handleUpdate(changes: TID[]) {
		if (autoSave && !d.errors) {
			editors.setValues(values!, data, changes);
			onsave?.({ changes, values: actualValues });
		} else {
			notSaved = changes;
		}
	}

	function getUniqueFields(arr: TID[]): TID[] {
		return [...new Set(arr)];
	}

	function runValidation(changes?: TID[]): TErrors {
		const check = editors.validateValues(actualValues, changes, _);

		if (!isSame(check, d.errors)) {
			onvalidation?.({ errors: check, values: actualValues });
		}

		return check;
	}

	function handleAction({ item }: { item: any }) {
		if (item.id === "save") {
			saveAction();
		} else if (item.id === "toggle-section") {
			activatedSection = item.key;
		}
		onaction?.({ item, values: actualValues, changes: notSaved });
	}

	function saveAction() {
		if (!notSaved.length) return;
		if (!autoSave) d.errors = runValidation();
		if (!d.errors) {
			onsave?.({
				changes: notSaved,
				values: actualValues,
			});
			editors.setValues(values!, data, notSaved);
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
	{hotkeys}
	errors={d.errors}
	onclick={handleAction}
	onkeydown={handleAction}
	onchange={handleChanges}
>
	{#if children}{@render children()}{/if}
</View>
