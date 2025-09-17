import { uid, isSame } from "@svar-ui/lib-state";

function rawGetter(key) {
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

	return obj => obj[key];
}
function rawSetter(key) {
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

	return (obj, v) => (obj[key] = v);
}

export function itemsToEditors(sections) {
	const config = sections.map(s => {
		const obj = { ...s };
		if (s.config) Object.assign(obj, s.config);

		obj.key = s.key || uid();
		obj.setter = s.setter || rawSetter(s.key);
		obj.getter = s.getter || rawGetter(s.key);
		return obj;
	});

	const getValues = raw => {
		const out = {};
		config.forEach(ed => {
			if (ed.comp === "section") return;
			if (ed.getter) out[ed.key] = ed.getter(raw);
			else out[ed.key] = raw[ed.key];
		});
		return out;
	};

	const setValues = (out, values, changes) => {
		const fields = changes.length
			? changes.map(key => config.find(a => a.key === key))
			: config;
		fields.forEach(ed => {
			if (ed.setter) ed.setter(out, values[ed.key]);
			else out[ed.key] = values[ed.key];
		});

		return out;
	};

	const diff = (raw, values) => {
		const initial = getValues(raw);
		const changes = [];
		config.forEach(ed => {
			const a = initial[ed.key];
			const b = values[ed.key];
			// we can have a situation when initial value is undefined
			// but empty editor will return empty value instead of undefined
			// this behavior is correct, but we need to ignore this case
			if (!isSame(a, b) && (a !== undefined || !!b)) {
				changes.push(ed.key);
			}
		});

		return changes;
	};

	const validateValues = (values, changes, _) => {
		let any = 0;
		const errors = {};

		const fields = changes?.length
			? changes.map(key => config.find(a => a.key === key))
			: config;

		fields.forEach(ed => {
			if (ed.required && !values[ed.key]) {
				errors[ed.key] = {
					errorType: "required",
				};
				ed.validationMessage =
					ed.validationMessage ?? _("This field is required");
				any++;
			} else if (ed.validation && !ed.validation(values[ed.key])) {
				errors[ed.key] = {
					errorType: "validation",
				};
				ed.validationMessage =
					ed.validationMessage ?? _("Invalid value");
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
