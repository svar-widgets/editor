<script lang="ts">
	import { Editor, registerEditorItem, CodeMirror } from "@svar-ui/svelte-editor";
	registerEditorItem("code-mirror", CodeMirror);
	registerEditorItem("code-mirror", CodeMirror, { readonly: true });

	const records = [
		{
			id: 1,
			name: "app.js",
			language: "javascript",
			content: `import { createStore } from "./store.js";

const store = createStore({ todos: [], filter: "all" });

export function addTodo(text) {
    const todo = { id: Date.now(), text, done: false };
    store.update(state => ({ ...state, todos: [...state.todos, todo] }));
    return todo;
}

export function toggleTodo(id) {
    store.update(state => ({
        ...state,
        todos: state.todos.map(t =>
            t.id === id ? { ...t, done: !t.done } : t
        ),
    }));
}

export function visibleTodos(state) {
    switch (state.filter) {
        case "active":
            return state.todos.filter(t => !t.done);
        case "done":
            return state.todos.filter(t => t.done);
        default:
            return state.todos;
    }
}`,
		},
		{
			id: 2,
			name: "spec.md",
			language: "markdown",
			content: `# Todo App Specification

A minimal task manager used as the reference demo for the code editor.

## Goals

- Add, toggle and remove tasks
- Persist tasks between sessions
- Filter by **all**, **active** or **done**

## Data model

| Field  | Type      | Description                |
| ------ | --------- | -------------------------- |
| id     | \`number\`  | Unique identifier          |
| text   | \`string\`  | Human readable description |
| done   | \`boolean\` | Completion flag            |

## Open questions

1. Should completed tasks auto-archive after 30 days?
2. Do we need multi-user support in v1?

> Note: keep the public API surface as small as possible.`,
		},
		{
			id: 3,
			name: "theme.css",
			language: "css",
			content: `:root {
    --color-bg: #ffffff;
    --color-surface: #f5f6f8;
    --color-text: #2a2a2a;
    --color-accent: #2196f3;
    --radius: 6px;
    --spacing: 8px;
}

.todo {
    display: flex;
    align-items: center;
    gap: var(--spacing);
    padding: calc(var(--spacing) * 1.5);
    background: var(--color-surface);
    border-radius: var(--radius);
    color: var(--color-text);
}

.todo--done {
    opacity: 0.5;
    text-decoration: line-through;
}

.todo button {
    margin-left: auto;
    border: none;
    border-radius: var(--radius);
    background: var(--color-accent);
    color: #fff;
    cursor: pointer;
}`,
		},
	];

	let selectedId = $state(records[0].id);
	let selected = $derived(records.find(r => r.id === selectedId)!);

	let values = $state({ ...records[0] });

	const items = $derived([
		{
			comp: "code-mirror",
			key: "content",
			label: "",
			fill: true,
			language: selected.language,
		},
	]);

	function selectFile(record: (typeof records)[number]) {
		if (record.id === selectedId) return;
		selectedId = record.id;
		values = { ...record };
	}

	const refresh = ({ values: v }: any) => {
		
		values = { ...values, ...v };
		// keep the edited content so switching files preserves changes
		const record = records.find(r => r.id === selectedId);
		if (record) record.content = v.content;
	};
	const prevent = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
	}
</script>

<div class="message">{#if selected}{selected.name} - {values.content.length} chars{/if}</div>

<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
<div class="files" onclick={prevent}>
	{#each records as record}
		<button
			class="demo-file"
			class:active={record.id === selectedId}
			onclick={() => selectFile(record)}
		>
			{record.name}
		</button>
	{/each}
</div>

{#if selectedId}
	<Editor
		placement="sidebar"
		autoSave={false}
		{items}
		{values}
		onaction={() => selectedId = 0 }
		onsave={refresh}
	/>
{/if}


<style>
	.message {
		padding: 5px 10px;
		background-color: #eee;
		color: #444;
		line-height: 33px;
		height: 40px;
	}

	.files {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 20px;
		border-right: 1px solid #ddd;
	}

	.demo-file {
		padding: 5px 10px;
		background-color: #eee;
		color: #444;
		line-height: 33px;
		height: 40px;
		width: 200px;
		text-align: left;
		border: 1px solid transparent;
		border-radius: 4px;
		cursor: pointer;
		font: inherit;
	}

	.demo-file:hover {
		background-color: #e2e2e2;
	}

	.demo-file.active {
		background-color: #2196f3;
		color: #fff;
		font-weight: 600;
	}
</style>
