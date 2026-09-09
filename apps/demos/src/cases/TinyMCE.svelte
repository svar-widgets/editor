<script lang="ts">
	import { Editor, registerEditorItem, TinyMCE } from "@svar-ui/svelte-editor";
	registerEditorItem("tinymce", TinyMCE);

	const records = [
		{
			id: 1,
			name: "welcome.html",
			content: `<h2>Welcome aboard!</h2>
<p>We are <strong>thrilled</strong> to have you join the team. Over the next few days you will meet your colleagues, set up your tools, and get a feel for how we work.</p>
<p>Take your time to settle in - and remember, <em>there are no silly questions</em>. Reach out whenever you need a hand.</p>
<p>Warm regards,<br /><strong>The People Team</strong></p>`,
		},
		{
			id: 2,
			name: "newsletter.html",
			content: `<h2>Monthly Update</h2>
<p>Here is a quick look at what shipped this month and what is coming next.</p>
<ul>
    <li><strong>New dashboard:</strong> a faster, cleaner overview of your projects.</li>
    <li><strong>Dark mode:</strong> now available in <em>Settings &rarr; Appearance</em>.</li>
    <li><strong>Bug fixes:</strong> dozens of small improvements across the app.</li>
</ul>
<p>As always, we would <em>love</em> to hear your feedback. Just hit reply and let us know what you think.</p>`,
		},
		{
			id: 3,
			name: "about.html",
			content: `<h2>About Us</h2>
<p>We build <strong>simple, reliable tools</strong> that help teams do their best work. Founded in a tiny garage, we now serve customers in <em>over forty countries</em>.</p>
<p>Our philosophy is straightforward: listen carefully, ship often, and always put the <strong>user first</strong>.</p>
<p><em>Thanks for being part of the journey.</em></p>`,
		},
	];

	let selectedId = $state(records[0].id);
	let selected = $derived(records.find(r => r.id === selectedId)!);

	let values = $state({ ...records[0] });

	const items = $derived([
		{
			comp: "tinymce",
			key: "content",
			label: "Content",
			fill: true,
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
