import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig, loadEnv } from "vite-plus";
import { stripBlocks } from "../../.vite-plugins/strip-blocks.js";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const getVars = () => ({
		__TRIAL__: JSON.stringify(env.VITE_SVAR_PACKAGE === "trial"),
	});

	return {
		define: getVars(),
		plugins: [
			stripBlocks({ strip: env.VITE_SVAR_PACKAGE === "mit" }),
			svelte(),
		],
		resolve: {
			dedupe: ["svelte"],
		},
		test: {
			include: ["tests/**/*.test.ts"],
		},
		server: {
			port: 3104,
			host: "0.0.0.0",
		},
	};
});
