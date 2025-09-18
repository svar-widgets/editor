const handlers = {};
export function getItemHandler(type) {
	return typeof type !== "undefined"
		? handlers[type] || type
		: handlers["text"];
}
export function registerEditorItem(type, handler) {
	handlers[type] = handler;
}
