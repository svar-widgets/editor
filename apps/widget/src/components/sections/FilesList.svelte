<script lang="ts">
	import { getContext } from "svelte";
	import { Button } from "@svar-ui/svelte-core";
	import { uid } from "@svar-ui/lib-dom";
	import type {
		TID,
		IWxI18n,
		IUploadedFile,
		TUploadURL,
		TFilesChangeHandler,
		TFilesActionHandler,
	} from "../../types.js";

	interface Props {
		data?: IUploadedFile[];
		readonly?: boolean;
		uploadURL?: TUploadURL;
		accept?: string;
		multiple?: boolean;
		disabled?: boolean;
		onchange?: TFilesChangeHandler;
		onaction?: TFilesActionHandler;
	}
	let {
		data = [],
		readonly = false,
		uploadURL = "",
		accept = "",
		multiple = true,
		disabled = false,
		onchange,
		onaction,
	}: Props = $props();

	const _ = getContext<IWxI18n>("wx-i18n").getGroup("editor");

	let input = $state<HTMLInputElement>();
	// stored files; reassigned locally on add/delete, refreshed when the prop changes
	let rawData = $derived(data ?? []);
	// in-flight and failed uploads; local-only, never part of the editor value
	let uploads = $state<IUploadedFile[]>([]);
	let list = $derived([...rawData, ...uploads]);

	function selectFiles(ev: Event) {
		const files = Array.from((ev.target as HTMLInputElement).files ?? []);
		files.forEach(addFile);
		if (input) input.value = "";
	}

	function addFile(file: File) {
		const obj: IUploadedFile = {
			id: uid(),
			name: file.name,
			size: file.size,
			status: "client",
			file,
		};
		uploads = multiple ? [...uploads, obj] : [obj];
		upload(obj);
	}

	function defaultUploader(obj: IUploadedFile): Promise<Record<string, any>> {
		const body = new FormData();
		body.append("upload", obj.file as File);
		return fetch(uploadURL as string, { method: "POST", body }).then(res =>
			res.json()
		);
	}

	async function upload(obj: IUploadedFile) {
		try {
			const res =
				typeof uploadURL === "function"
					? await uploadURL(obj)
					: await defaultUploader(obj);
			if (!res || res.status === "error") fail(obj.id);
			else commit(obj, res);
		} catch {
			fail(obj.id);
		}
	}

	function fail(id: TID) {
		uploads = uploads.map(u =>
			u.id === id ? { ...u, status: "error" as const } : u
		);
	}

	function commit(obj: IUploadedFile, res: Record<string, any>) {
		// stored object holds metadata only; server response (with permanent id) wins
		const stored: IUploadedFile = { ...obj, ...res };
		delete stored.file;
		delete stored.status;

		uploads = uploads.filter(u => u.id !== obj.id);
		const value = multiple ? [...rawData, stored] : [stored];
		rawData = value;
		onchange?.({ value, action: "add", file: stored });
		onaction?.({ action: "add-file", file: stored, value });
	}

	function remove(item: IUploadedFile) {
		if (uploads.some(u => u.id === item.id)) {
			// pending or failed upload - never entered the value, no events
			uploads = uploads.filter(u => u.id !== item.id);
			return;
		}
		const value = rawData.filter(f => f.id !== item.id);
		rawData = value;
		onchange?.({ value, action: "delete", file: item });
		onaction?.({ action: "delete-file", file: item, value });
	}
</script>

<div class="wx-files">
	{#if list.length}
		<ul class="wx-list">
			{#each list as f (f.id)}
				<li
					class="wx-file"
					class:wx-uploading={f.status === "client"}
					class:wx-failed={f.status === "error"}
				>
					<i class="wxi-file wx-file-icon"></i>
					{#if f.url}
						<a
							class="wx-name"
							href={f.url}
							target="_blank"
							rel="noreferrer">{f.name}</a
						>
					{:else}
						<span class="wx-name">{f.name}</span>
					{/if}
					{#if f.status === "client"}
						<span class="wx-status">{_("Uploading...")}</span>
					{:else if f.status === "error"}
						<span class="wx-status wx-error">
							{_("Upload failed")}
						</span>
					{/if}
					{#if !readonly}
						<button
							type="button"
							class="wx-remove"
							title={_("Delete file")}
							onclick={() => remove(f)}
						>
							<i class="wxi-delete-outline"></i>
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
	{#if !readonly}
		<input
			type="file"
			class="wx-input"
			bind:this={input}
			onchange={selectFiles}
			{accept}
			{multiple}
			{disabled}
		/>
		<Button
			icon="wxi-plus"
			{disabled}
			onclick={() => input && input.click()}
		>
			{_("Add file")}
		</Button>
	{/if}
</div>

<style>
	.wx-files {
		width: var(--wx-field-width);
		max-width: 100%;
	}
	.wx-list {
		list-style: none;
		margin: 0 0 8px;
		padding: 0;
	}
	.wx-file {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 8px;
		border-radius: var(--wx-input-border-radius);
	}
	.wx-file:hover {
		background: var(--wx-background-alt);
	}
	.wx-file-icon {
		color: var(--wx-color-font-alt);
	}
	.wx-name {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--wx-color-font);
	}
	a.wx-name {
		color: var(--wx-color-link);
		text-decoration: none;
	}
	a.wx-name:hover {
		text-decoration: underline;
	}
	.wx-uploading .wx-name,
	.wx-failed .wx-name {
		color: var(--wx-color-font-alt);
	}
	.wx-status {
		font-size: 12px;
		color: var(--wx-color-font-alt);
	}
	.wx-status.wx-error {
		color: var(--wx-color-danger);
	}
	.wx-remove {
		display: flex;
		align-items: center;
		border: none;
		background: transparent;
		padding: 2px;
		cursor: pointer;
		color: var(--wx-color-font-alt);
		font-size: var(--wx-icon-size);
	}
	.wx-remove:hover {
		color: var(--wx-color-danger);
	}
	.wx-input {
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
	}
</style>
