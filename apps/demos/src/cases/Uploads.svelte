<script lang="ts">
	import { Editor, registerEditorItem, Attachments } from "@svar-ui/svelte-editor";
	registerEditorItem("files", Attachments);
	registerEditorItem("files", Attachments, { readonly: true });

	let counter = 100;
	// fake server: returns the permanent id after a delay,
	// fails for files with "fail" in the name
	const uploadURL = (file: any) =>
		new Promise<any>((res, rej) =>
			setTimeout(() => {
				if (/fail/i.test(file.name)) rej(new Error("server error"));
				else res({ id: counter++, name: file.name, url: "#" });
			}, 800)
		);

	let message = $state("");
	const items = [
		{ comp: "text", key: "name", label: "Name" },
		{
			comp: "files",
			key: "files",
			label: "Attachments",
			uploadURL,
			onaction: (ev: any) => (message = `${ev.action}: ${ev.file.name}`),
		},
	];

	let values = $state({
		id: 1,
		name: "Annual report",
		files: [
			{ id: 1, name: "report-2025.pdf", url: "#" },
			{ id: 2, name: "summary.xlsx", url: "#" },
		],
	});

	const refresh = ({ values: v }: any) => {
		values = { ...values, ...v };
	};
</script>

<div class="message">{message}</div>

<p class="hint">
	Files upload on select (mock server, ~1s); a file with "fail" in its name
	shows the error state. Add/delete signals appear above.
</p>

<Editor
	placement="sidebar"
	autoSave={true}
	{items}
	{values}
	onsave={refresh}
/>

<style>
	.message {
		padding: 5px 10px;
		background-color: #eee;
		color: #444;
		line-height: 33px;
		height: 40px;
	}
	.hint {
		margin: 10px;
		max-width: 400px;
	}
</style>
