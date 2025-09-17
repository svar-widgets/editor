<script>
	import { Uploader, UploaderList } from "@svar-ui/svelte-uploader";

	let { value = [], uploadURL, onchange, ...restProps } = $props();

	function handleChange(obj) {
		value = [...value, obj];
		onchange && onchange({ value });
	}
</script>

<div class="wx-event-calendar-uploader">
	<Uploader data={value} onchange={handleChange} {uploadURL} {...restProps} />
	<UploaderList data={value} />
</div>

<style>
	.wx-event-calendar-uploader {
		width: 100%;
		gap: 10px;
		display: flex;
		flex-direction: column;
	}

	.wx-event-calendar-uploader :global(.label) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 70px;
		border: 1px dashed var(--wx-color-primary);
	}

	.wx-event-calendar-uploader :global(.dropzone) {
		background-color: transparent;
		border: none;
	}
</style>
