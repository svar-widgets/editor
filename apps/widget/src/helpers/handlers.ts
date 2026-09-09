import type { Component } from "svelte";

type ItemConfig = {
	readonly?: boolean;
};

const handlers: Record<string, Component<any>> = {};
export function getItemHandler(
	type: string | Component<any> | undefined,
	config: ItemConfig | null = null
): Component<any> {
	const c = typeof type === "string" ? handlers[getID(type, config)] : type;
	return c || handlers[getDefaultType(config)];
}

export function registerEditorItem(
	type: string,
	handler: Component<any>,
	config: ItemConfig | null = null
): void {
	handlers[getID(type, config)] = handler;
}

function getID(type: string, config: ItemConfig | null = null): string {
	return `${type}${config?.readonly ? ":readonly" : ""}`;
}
function getDefaultType(config: ItemConfig | null = null): string {
	return config?.readonly ? "readonly" : "text";
}
