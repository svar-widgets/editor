import type { ParsedStack, TestError } from "vite-plus/test";
import { defineConfig } from "vite-plus";

export default defineConfig({
	staged: {
		"*": "vp check --fix",
	},
	lint: { options: { typeAware: true, typeCheck: true } },
	fmt: {
		useTabs: true,
		semi: true,
		singleQuote: false,
		quoteProps: "as-needed",
		trailingComma: "es5",
		bracketSpacing: true,
		arrowParens: "avoid",
		svelteSortOrder: "options-scripts-markup-styles",
		printWidth: 80,
	},
	test: {
		exclude: ["**/node_modules", "apps/tests/**"],
		onStackTrace(error: TestError, { file }: ParsedStack): boolean | void {
			// Reject all frames from third party libraries.
			if (file.includes("node_modules")) {
				return false;
			}
		},
	},
});
