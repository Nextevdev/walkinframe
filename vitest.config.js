import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		include: ["tests/unit/**/*.test.js"],
		coverage: {
			provider: "v8",
			include: ["main.js", "src/**/*.js"],
			reporter: ["text", "lcov"],
			thresholds: { lines: 85, functions: 85, statements: 85 },
		},
	},
});
