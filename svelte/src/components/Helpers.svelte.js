export function link(getValue) {
	let localState = $state(undefined);
	const linkedDerived = $derived.by(() => {
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

export function dataLink(getValue) {
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
