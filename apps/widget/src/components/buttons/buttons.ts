import type { IButton, THelper } from "../../types.js";

export const Spacer = (): IButton => ({ comp: "spacer" });
export const CancelButton = (_: THelper): IButton => ({
	comp: "button",
	text: _("Cancel"),
	id: "cancel",
});
export const SaveButton = (_: THelper): IButton => ({
	type: "primary",
	comp: "button",
	text: _("Save"),
	id: "save",
});
export const CloseIcon = (): IButton => ({
	comp: "icon",
	icon: "wxi-close",
	id: "close",
});
