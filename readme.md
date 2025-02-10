<div align="center">

# SVAR Svelte Editor

[![npm](https://img.shields.io/npm/v/wx-svelte-editor.svg)](https://www.npmjs.com/package/wx-svelte-editor)
[![License](https://img.shields.io/github/license/svar-widgets/editor)](https://github.com/svar-widgets/editor/blob/main/license.txt)
[![npm downloads](https://img.shields.io/npm/dm/wx-svelte-editor.svg)](https://www.npmjs.com/package/wx-svelte-editor)

</div>

<div align="center">

[Documentation](https://docs.svar.dev/svelte/editor/) • [Demos](https://docs.svar.dev/svelte/editor/samples/#/base/willow)

</div>

A Svelte UI component for rendering editable list of tasks

### How to Use

To use the widget, simply import the package and include the component in your Svelte file:

```svelte
<script>
	import { Editor } from "wx-svelte-editor";

	const value = [];
</script>

<Editor {value} />
```

### How to Modify

Typically, you don't need to modify the code. However, if you wish to do so, follow these steps:

1. Run `yarn` to install dependencies. Note that this project is a monorepo using `yarn` workspaces, so npm will not work
2. Start the project in development mode with `yarn start`

### Run Tests

To run the test:

1. Start the test examples with:
    ```sh
    yarn start:tests
    ```
2. In a separate console, run the end-to-end tests with:
    ```sh
    yarn test:cypress
    ```
