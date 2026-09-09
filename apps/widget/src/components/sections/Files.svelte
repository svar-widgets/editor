<script lang="ts">
	import FilesList from "./FilesList.svelte";
	import type {
		TFilesValue,
		IFilesChangeEvent,
		IUploadedFile,
		TFilesChangeHandler,
	} from "../../types.js";

	interface Props {
		value?: TFilesValue;
		// resolves the display list when value is a master record id
		ondata?: (value: TFilesValue) => Promise<IUploadedFile[]> | IUploadedFile[];
		onchange?: TFilesChangeHandler;
		[key: string]: any;
	}
	const { ondata, onchange, value, ...props }: Props = $props();
	const finalData = $derived(ondata && value ? ondata(value) : value);

	const handleOnchange = (e: IFilesChangeEvent) => {
		e.originalValue = value;
		return onchange && onchange(e);
	};
</script>

{#await finalData}
	<FilesList data={[]} {...props} onchange={handleOnchange} />
{:then data}
	<FilesList data={(data as IUploadedFile[]) ?? []} {...props} onchange={handleOnchange} />
{/await}
