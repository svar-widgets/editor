export function link<T>(getValue: () => T): [() => T, (v: T) => void] {
	let localState = $state<T | undefined>(undefined);
	const linkedDerived = $derived.by<T>(() => {
		const linkedValue = getValue();
		return typeof localState !== "undefined" ? localState : linkedValue;
	});

	return [
		() => linkedDerived,
		v => {
			localState = v;
		},
	];
}

export function dataLink<T>(getValue: () => T): { errors: T } {
	const [getErrors, setErrors] = link(getValue);

	return {
		get errors() {
			return getErrors();
		},
		set errors(value) {
			setErrors(value);
		},
	};
}
