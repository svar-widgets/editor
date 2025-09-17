<script>
	import { Editor } from "/src";
	import { getData } from "../data";
	import { Material, Locale } from "@svar-ui/svelte-core";

	const { data } = getData();
</script>

<Material>
	<Locale>
		<div style="padding: 20px; width: 360px">
			<Editor {data} />
		</div>
	</Locale>
</Material>
