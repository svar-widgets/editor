<script>
	import { onMount } from "svelte";
	import Router, { push } from "svelte-spa-router";
	import { getRoutes, getFlatLinks } from "./helpers";

	let { skin = $bindable(), onnewpage, productTag } = $props();
	let page = $state(),
		title,
		link,
		name;
	const baseLink = $derived(
		"https://github.com/svar-widgets/" +
		productTag +
		"/blob/main/apps/demos/src/cases/"
	);

	$effect(() => {
		if (skin && page) {
			push(`/${page}/${skin}`);
		}
	});

	onMount(() => {
		onnewpage?.({ page, skin, title, link });
	});

	function onRouteChange(path) {
		const parts = path.split("/");
		page = parts[1];
		skin = parts[2];

		const tPage = `/${page}/:skin`;
		const matched = links.find(a => a[0] === tPage);
		title = matched?.[1] ?? "";
		const props = matched?.[3] ?? { };
		name = props.file ?? matched?.[1];
		link = `${baseLink}${name.replace(/\s+/g, "")}.svelte`;

		onnewpage?.({ page, skin, title, link });
	}

	const links = getFlatLinks();
	const routes = getRoutes({}, onRouteChange);
</script>

<Router {routes} />
