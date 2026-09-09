import { registerEditorItem } from "./helpers/handlers.js";
import Form from "./components/Form.svelte";
import Editor from "./components/Editor.svelte";

import { Willow, WillowDark } from "@svar-ui/svelte-core";

import ReadOnly from "./components/sections/ReadOnly.svelte";
import Section from "./components/sections/Section.svelte";
import Attachments from "./components/sections/Files.svelte";
import CodeMirror from "./components/sections/CodeMirror.svelte";
import TinyMCE from "./components/sections/TinyMCE.svelte";
import { Text } from "@svar-ui/svelte-core";
import { TextArea } from "@svar-ui/svelte-core";
import { Checkbox } from "@svar-ui/svelte-core";

registerEditorItem("text", Text);
registerEditorItem("textarea", TextArea);
registerEditorItem("checkbox", Checkbox);

registerEditorItem("readonly", ReadOnly);
registerEditorItem("section", Section);

export {
	registerEditorItem,
	Form,
	Editor,
	Willow,
	WillowDark,
	Attachments,
	CodeMirror,
	TinyMCE,
};
