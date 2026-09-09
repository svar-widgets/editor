import { svelte } from "@sveltejs/vite-plugin-svelte";
import { stripBlocks } from "../../.vite-plugins/strip-blocks.js";
import { defineConfig, loadEnv } from "vite-plus";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const getVars = () => ({
		__TRIAL__: JSON.stringify(env.VITE_SVAR_PACKAGE === "trial"),
	});

	return {
		define: getVars(),
		base: "./",
		plugins: [
			stripBlocks({ strip: env.VITE_SVAR_PACKAGE === "mit" }),
			svelte(),
		],
		resolve: {
			dedupe: ["svelte"],
		},
		server: {
			port: 3103,
			host: "0.0.0.0",
		},
	};
});
