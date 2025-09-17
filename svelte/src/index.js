import { registerEditorItem } from "./helpers";
import Form from "./components/Form.svelte";
import Editor from "./components/Editor.svelte";

import Material from "./themes/Material.svelte";
import Willow from "./themes/Willow.svelte";
import WillowDark from "./themes/WillowDark.svelte";

import ReadOnly from "./components/sections/ReadOnly.svelte";
import Section from "./components/sections/Section.svelte";
import { Text } from "@svar-ui/svelte-core";
import { TextArea } from "@svar-ui/svelte-core";
import { Checkbox } from "@svar-ui/svelte-core";

registerEditorItem("text", Text);
registerEditorItem("textarea", TextArea);
registerEditorItem("checkbox", Checkbox);

registerEditorItem("readonly", ReadOnly);
registerEditorItem("section", Section);

import { setEnv } from "@svar-ui/lib-dom";
import { env } from "@svar-ui/lib-svelte";
setEnv(env);

export { registerEditorItem, Form, Editor, Material, Willow, WillowDark };
