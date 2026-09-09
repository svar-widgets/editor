import Inline from "./cases/Inline.svelte";
import BasicInit from "./cases/BasicInit.svelte";
import Modal from "./cases/Modal.svelte";
import Sidebar from "./cases/Sidebar.svelte";
import Tabs from "./cases/Tabs.svelte";
import Sections from "./cases/Sections.svelte";
import Buttons from "./cases/Buttons.svelte";
import Tasklist from "./cases/Tasklist.svelte";
import Comments from "./cases/Comments.svelte";
import MultipleCombos from "./cases/MultipleCombos.svelte";
import Fullscreen from "./cases/Fullscreen.svelte";
import Validation from "./cases/Validation.svelte";
import Locales from "./cases/Locales.svelte";
import MultiField from "./cases/MultiField.svelte";
import Uploads from "./cases/Uploads.svelte";
import CodeMirror from "./cases/CodeMirror.svelte";
import TinyMCE from "./cases/TinyMCE.svelte";

export const links = [
	{
		group: "",
		items: [["/base/:skin", "Basic Editor", BasicInit, { file: "BasicInit" }]],
	},
	{
		group: "Layout",
		items: [
			["/modal/:skin", "As Modal", Modal, { file: "Modal" }],
			["/sidebar/:skin", "As Sidebar", Sidebar, { file: "Sidebar" }],
			["/inline/:skin", "Inline", Inline, { file: "Inline" }],
			["/fullscreen/:skin", "Fullscreen", Fullscreen, { file: "Fullscreen" }],
			["/tabs/:skin", "With Tabs", Tabs, { file: "Tabs" }],
			["/sections/:skin", "With Sections", Sections, { file: "Sections" }],
		],
	},
	{
		group: "Items",
		items: [
			["/comments/:skin", "Comments", Comments, { file: "Comments" }],
			["/files/:skin", "Attachments", Uploads, { file: "Uploads" }],
			["/taslkist/:skin", "Tasklist", Tasklist, { file: "Tasklist" }],
			[
				"/combos/:skin",
				"Linked lists",
				MultipleCombos,
				{ file: "MultipleCombos" },
			],
			["/buttons/:skin", "Buttons", Buttons, { file: "Buttons" }],
			[
				"/multifield/:skin",
				"Custom controls",
				MultiField,
				{ file: "MultiField" },
			],
			["/tinymce/:skin", "Rich Text", TinyMCE, { file: "TinyMCE" }],
			["/code-mirror/:skin", "Code Mirror", CodeMirror, { file: "CodeMirror" }],
		],
	},
	{
		group: "Features",
		items: [
			["/validation/:skin", "Validation", Validation, { file: "Validation" }],
			["/locales/:skin", "Locales", Locales, { file: "Locales" }],
		],
	},
];
