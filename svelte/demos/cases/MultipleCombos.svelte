<script>
	import { Form } from "../../src";

	let items = $state([
		{
			comp: "combo",
			label: "Country",
			key: "country",
			options: [
				{ id: "france", label: "France" },
				{ id: "germany", label: "Germany" },
				{ id: "poland", label: "Poland" },
				{ id: "spain", label: "Spain" },
			],
		},
		{
			comp: "combo",
			label: "City",
			key: "city",
			disabled: true,
		},
	]);

	const cities = {
		france: [
			{ id: "lyon", label: "Lyon" },
			{ id: "marseille", label: "Marseille" },
			{ id: "paris", label: "Paris" },
			{ id: "strasbourg", label: "Strasbourg" },
		],
		germany: [
			{ id: "berlin", label: "Berlin" },
			{ id: "dresden", label: "Dresden" },
			{ id: "hamburg", label: "Hamburg" },
			{ id: "munich", label: "Munich" },
		],
		poland: [
			{ id: "gdansk", label: "Gdansk" },
			{ id: "krakow", label: "Krakow" },
			{ id: "lublin", label: "Lublin" },
			{ id: "warsaw", label: "Warsaw" },
		],
		spain: [
			{ id: "barcelona", label: "Barcelona" },
			{ id: "madrid", label: "Madrid" },
			{ id: "seville", label: "Seville" },
			{ id: "valencia", label: "Valencia" },
		],
	};

	let values = $state({
		country: "",
		city: "",
	});

	function handleUpdate(ev) {
		const { key, value, update } = ev;

		if (key === "country") {
			items[1] = {
				...items[1],
				disabled: false,
				options: cities[value],
			};

			update.city = "";
		}
	}
</script>

<div style="padding: 10px;">
	<h3>Changing the country updates list of options in the cities combo</h3>
	<div class="form">
		<Form {items} {values} onchange={handleUpdate} />
	</div>
</div>

<style>
	.form {
		border-top: 1px solid #ccc;
		padding: 10px;
		height: 600px;
		width: 600px;
	}

	.form :global(.sections) {
		height: 100%;
	}
</style>
