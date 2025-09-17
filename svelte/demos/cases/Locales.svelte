<script>
	import { Locale, Segmented, Button } from "@svar-ui/svelte-core";
	import { Editor } from "../../src/index";

	import { de, cn, en } from "@svar-ui/editor-locales";
	import { de as deCore, cn as cnCore, en as enCore } from "@svar-ui/core-locales";

	const items = [
		{
			comp: "text",
			key: "firstName",
			label: "First name",
			required: true,
		},
		{
			comp: "text",
			key: "lastName",
			label: "Last name",
			required: true,
		},
		{ comp: "checkbox", key: "admin", label: "Is Admin" },
		{ comp: "checkbox", key: "guest", label: "Is Guest" },
		{ comp: "textarea", key: "description", label: "Description" },
	];

	const values = {
		firstName: "John",
		lastName: "Doe",
		admin: false,
		guest: true,
	};

	const langs = [
		{ id: "en", label: "EN" },
		{ id: "de", label: "DE" },
		{ id: "cn", label: "CN" },
	];
	let lang = $state("en");
	let readonly = $state();
	let visible = $state();

	const getWords = lang => {
		if (lang == "en") return { ...enCore, ...en };
		if (lang == "cn") return { ...cnCore, ...cn };
		if (lang == "de") return { ...deCore, ...de };
	};

	function handleClick() {
		visible = false;
	}
</script>

<div class="toolbar">
	<Segmented options={langs} bind:value={lang} />
	<Button
		css="item"
		type="primary"
		text="Open sidebar: Manual save"
		onclick={() => {
			readonly = false;
			visible = true;
		}}
	/>
	<Button
		css="item"
		type="secondary"
		text="Open sidebar: Readonly"
		onclick={() => {
			readonly = true;
			visible = true;
		}}
	/>
</div>
<div style="margin: auto; max-width: 700px; margin-top: 40px;">
	{#key lang}
		<Locale words={getWords(lang)}>
			<Editor {items} {values} topBar={false} />
			{#if visible}
				<Editor
					placement={"sidebar"}
					{readonly}
					{items}
					{values}
					onaction={handleClick}
				/>
			{/if}
		</Locale>
	{/key}
</div>

<style>
	.toolbar {
		display: flex;
		flex-direction: row;
		padding: 10px;
	}
	:global(.toolbar .item) {
		margin-left: 20px;
	}
</style>
