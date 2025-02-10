export const Spacer = () => ({ comp: "spacer" });
export const CancelButton = _ => ({
	comp: "button",
	text: _("Cancel"),
	id: "cancel",
});
export const SaveButton = _ => ({
	type: "primary",
	comp: "button",
	text: _("Save"),
	id: "save",
});
export const CloseIcon = () => ({
	comp: "icon",
	icon: "wxi-close",
	id: "close",
});
