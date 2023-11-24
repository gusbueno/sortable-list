import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environmentMatchGlobs: [
			["**/*.test.{ts,tsx}", "jsdom"],
		],
	},
	plugins: [tsconfigPaths()],
});
