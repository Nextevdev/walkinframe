import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "tests/e2e",
	workers: 1,
	retries: process.env.CI ? 1 : 0,
	webServer: {
		command: "python -m http.server 8766",
		url: "http://localhost:8766/index.html",
		reuseExistingServer: true,
	},
	use: { baseURL: "http://localhost:8766" },
	projects: [
		{ name: "desktop", use: { ...devices["Desktop Chrome"] } },
		{ name: "phone", use: { ...devices["Pixel 7"] } },
	],
});
