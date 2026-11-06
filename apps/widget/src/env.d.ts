/// <reference types="svelte" />
declare module "@svar-ui/editor-locales";
declare module "@svar-ui/core-locales";
declare module "@svar-ui/svelte-toolbar";

// globals of the libraries loaded from CDN by CodeMirror and TinyMCE sections
declare const codemirror: any;
declare const tinymce: any;

declare module "*.svelte" {
	import type { Component } from "svelte";
	const component: Component<any>;
	export default component;
}
