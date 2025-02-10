const handlers = {};
export function getItemHandler(type) {
	return handlers[type] || handlers["text"];
}
export function registerEditorItem(type, handler) {
	handlers[type] = handler;
}
