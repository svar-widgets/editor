export function hotkeys(node, { keys, action }) {
	function handleKeydown(event) {
		let code = event.code.replace("Key", "").toLowerCase();
		const key = `${event.ctrlKey || event.metaKey ? "ctrl+" : ""}${code}`;

		const item = keys[key];

		if (!item) return;

		const selectControl =
			event.target.closest(".wx-combo") ||
			event.target.closest(".wx-multicombo") ||
			event.target.closest(".wx-richselect");
		const selectDropdown =
			selectControl && selectControl.querySelector(".wx-list");

		if (!selectDropdown) {
			event.preventDefault();
			action(item);
		}
	}

	node.addEventListener("keydown", handleKeydown);
	return {
		destroy: () => {
			node.removeEventListener("keydown", handleKeydown);
		},
	};
}
