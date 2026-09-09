/// <reference types="svelte" />
declare module "@svar-ui/editor-locales";
declare module "@svar-ui/core-locales";
declare module "@svar-ui/svelte-toolbar";

declare module "*.svelte" {
	import type { Component } from "svelte";
	const component: Component<any>;
	export default component;
}
