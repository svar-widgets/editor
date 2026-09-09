<script lang="ts">
	import { Locale, Segmented } from "@svar-ui/svelte-core";
	import { Editor } from "@svar-ui/svelte-editor";

	import { de, cn, en, es, fr, it, jp, pt, ru } from "@svar-ui/editor-locales";
	import {
		de as deCore,
		cn as cnCore,
		en as enCore,
		es as esCore,
		fr as frCore,
		it as itCore,
		ja as jaCore,
		pt as ptCore,
		ru as ruCore,
	} from "@svar-ui/core-locales";

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

	const vcb = {
		en: {},
		de: {
			"Is Admin": "Ist Admin",
			"Is Guest": "Ist Gast",
			"First name": "Vorname",
			"Last name": "Nachname",
			Description: "Beschreibung",
		},
		cn: {
			"Is Admin": "是管理员",
			"Is Guest": "是访客",
			"First name": "名字",
			"Last name": "姓氏",
			Description: "描述",
		},
		es: {
			"Is Admin": "Es administrador",
			"Is Guest": "Es invitado",
			"First name": "Nombre",
			"Last name": "Apellido",
			Description: "Descripción",
		},
		fr: {
			"Is Admin": "Est administrateur",
			"Is Guest": "Est invité",
			"First name": "Prénom",
			"Last name": "Nom",
			Description: "Description",
		},
		it: {
			"Is Admin": "È amministratore",
			"Is Guest": "È ospite",
			"First name": "Nome",
			"Last name": "Cognome",
			Description: "Descrizione",
		},
		jp: {
			"Is Admin": "管理者です",
			"Is Guest": "ゲストです",
			"First name": "名",
			"Last name": "姓",
			Description: "説明",
		},
		pt: {
			"Is Admin": "É administrador",
			"Is Guest": "É convidado",
			"First name": "Nome",
			"Last name": "Sobrenome",
			Description: "Descrição",
		},
		ru: {
			"Is Admin": "Администратор",
			"Is Guest": "Гость",
			"First name": "Имя",
			"Last name": "Фамилия",
			Description: "Описание",
		},
	} as Record<string, Record<string, string>>;
	const translateItems = (items: any[]) => {
		return items.map(item => {
			return {
				...item,
				label: vcb[lang][item.label]||item.label,
			};
		});
	};

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
		{ id: "es", label: "ES" },
		{ id: "fr", label: "FR" },
		{ id: "it", label: "IT" },
		{ id: "jp", label: "JP" },
		{ id: "pt", label: "PT" },
		{ id: "ru", label: "RU" },
	];
	let lang = $state("de");
	
	const getWords = (lang: any) => {
		if (lang == "en") return { ...enCore, ...en };
		if (lang == "cn") return { ...cnCore, ...cn };
		if (lang == "de") return { ...deCore, ...de };
		if (lang == "es") return { ...esCore, ...es };
		if (lang == "fr") return { ...frCore, ...fr };
		if (lang == "it") return { ...itCore, ...it };
		if (lang == "jp") return { ...jaCore, ...jp };
		if (lang == "pt") return { ...ptCore, ...pt };
		if (lang == "ru") return { ...ruCore, ...ru };
	};

	const resetName = () => {
		// trigger validation
		setTimeout(() => {
			const input = document.querySelector(
				".wx-editor .wx-text input",
			) as HTMLInputElement;

			input.value = "";
			input.dispatchEvent(
				new InputEvent("input", {
					inputType: "deleteContentBackward",
					bubbles: true,
				}),
			);
		}, 500);
	};
	resetName();
</script>

<div class="toolbar">
<Segmented options={langs} bind:value={lang} onchange={resetName} />
</div>
<div style="margin: auto; max-width: 700px; margin-top: 40px;">
	{#key lang}
		<Locale words={getWords(lang)}>
			<Editor {values} autoSave={true} placement="sidebar" items={translateItems(items)} />

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
