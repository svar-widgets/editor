import { uid, isSame } from "@svar-ui/lib-state";
import type {
	IItemConfig,
	IEditor,
	IEditorsConfig,
	TValues,
	TErrors,
	TID,
	THelper,
} from "../types.js";

function rawGetter(key: TID | undefined): (obj: any) => any {
	if (typeof key === "string" && key.includes(".")) {
		const parts = key.split(".");
		return obj => {
			let out = obj;
			parts.forEach(p => {
				out = out[p];
			});
			return out;
		};
	}

	return obj => obj[key as TID];
}
function rawSetter(key: TID | undefined): (obj: any, v: any) => void {
	if (typeof key === "string" && key.includes(".")) {
		const parts = key.split(".");
		return (obj, v) => {
			let out = obj;
			parts.forEach((p, i) => {
				if (i === parts.length - 1) out[p] = v;
				else out = out[p];
			});
		};
	}

	return (obj, v) => (obj[key as TID] = v);
}

function compositeGetter(keys: TID[]): (obj: any) => any {
	const getters = keys.map(k => ({ k, get: rawGetter(k) }));
	return obj => {
		const out: TValues = {};
		getters.forEach(({ k, get }) => (out[k] = get(obj)));
		return out;
	};
}
function compositeSetter(keys: TID[]): (obj: any, v: any) => void {
	const setters = keys.map(k => ({ k, set: rawSetter(k) }));
	return (obj, v) => {
		setters.forEach(({ k, set }) => set(obj, v?.[k]));
	};
}

export function itemsToEditors(sections: IItemConfig[]): IEditorsConfig {
	const config: IEditor[] = sections.map(s => {
		const obj = { ...s } as IEditor;
		if (s.config) Object.assign(obj, s.config);

		obj.key = s.key || uid();
		obj.setter =
			s.setter || (s.keys ? compositeSetter(s.keys) : rawSetter(s.key));
		obj.getter =
			s.getter || (s.keys ? compositeGetter(s.keys) : rawGetter(s.key));

		return obj;
	});

	// resolves both editor keys and multi-field sub-keys to the owning editor
	const byKey = new Map<TID, IEditor>();
	config.forEach(ed => {
		if (!byKey.has(ed.key)) byKey.set(ed.key, ed);
		ed.keys?.forEach(k => {
			if (!byKey.has(k)) byKey.set(k, ed);
		});
	});

	const resolveFields = (changes: TID[] | undefined): IEditor[] => {
		if (!changes?.length) return config;
		const out = new Set<IEditor>();
		changes.forEach(key => {
			const ed = byKey.get(key);
			if (ed) out.add(ed);
		});
		return [...out];
	};

	const getValues = (raw: TValues): TValues => {
		const out: TValues = {};
		config.forEach(ed => {
			if (ed.comp === "section") return;
			if (ed.getter) out[ed.key] = ed.getter(raw);
			else out[ed.key] = raw[ed.key];
		});
		return out;
	};

	const setValues = (
		out: TValues,
		values: TValues,
		changes: TID[]
	): TValues => {
		resolveFields(changes).forEach(ed => {
			if (ed.setter) ed.setter(out, values[ed.key]);
			else out[ed.key] = values[ed.key];
		});

		return out;
	};

	const diff = (raw: TValues, values: TValues): TID[] => {
		const initial = getValues(raw);
		const changes: TID[] = [];
		// we can have a situation when initial value is undefined
		// but empty editor will return empty value instead of undefined
		// this behavior is correct, but we need to ignore this case
		const changed = (a: any, b: any) =>
			!isSame(a, b) && (a !== undefined || !!b);

		config.forEach(ed => {
			const a = initial[ed.key];
			const b = values[ed.key];
			if (ed.keys?.length) {
				// multi-field item: compare composite member-wise,
				// report the real field keys
				ed.keys.forEach(k => {
					if (changed(a?.[k], b?.[k])) changes.push(k);
				});
			} else if (changed(a, b)) {
				changes.push(ed.key);
			}
		});

		return changes;
	};

	const validateValues = (
		values: TValues,
		changes: TID[] | undefined,
		_: THelper
	): TErrors => {
		let any = 0;
		const errors: Record<string, { errorType: string }> = {};

		// for a multi-field item "required" means every field has a truthy value
		const missing = (ed: IEditor, v: any) =>
			ed.keys?.length ? ed.keys.some(k => !v?.[k]) : !v;

		resolveFields(changes).forEach(ed => {
			const v = ed.getter(values);
			if (ed.required && missing(ed, v)) {
				errors[ed.key] = {
					errorType: "required",
				};
				ed.validationMessage =
					ed.validationMessage ?? _("This field is required");
				any++;
			} else if (ed.validation && !ed.validation(v)) {
				errors[ed.key] = {
					errorType: "validation",
				};
				ed.validationMessage = ed.validationMessage ?? _("Invalid value");
				any++;
			}
		});

		return any > 0 ? errors : null;
	};

	return {
		config: config.filter(x => x.comp !== "hidden"),
		getValues,
		setValues,
		diff,
		validateValues,
	};
}
