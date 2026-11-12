import { expect, test } from "@playwright/test";

test("page loads clean: no console errors, no horizontal overflow", async ({ page }) => {
	const errors = [];
	page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
	await page.goto("/index.html");
	await expect(page.getByRole("heading", { level: 1 })).toContainText("The camera moves.");
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
	);
	expect(overflow).toBeLessThanOrEqual(0);
	expect(errors.filter((text) => !text.includes("Failed to load resource"))).toEqual([]);
});

test("request buttons are real mailto links with a subject", async ({ page }) => {
	await page.goto("/index.html");
	const links = page.locator('a.btn[href^="mailto:"]');
	await expect(links).toHaveCount(3);
	expect(await links.first().getAttribute("href")).toContain("subject=Free%20sample%20request");
});

test("scroll reveal brings the closing block into view", async ({ page }) => {
	await page.goto("/index.html");
	const heading = page.locator("#close-title");
	await heading.scrollIntoViewIfNeeded();
	await expect(heading).toHaveClass(/is-in/);
});

test("photos leave their skeleton once decoded", async ({ page }) => {
	await page.goto("/index.html");
	await page.locator(".tile-btn").first().scrollIntoViewIfNeeded();
	await expect(page.locator(".tile-btn.is-loaded").first()).toBeVisible();
});

test("reduced motion shows everything without reveal classes", async ({ browser }) => {
	const context = await browser.newContext({ reducedMotion: "reduce" });
	const page = await context.newPage();
	await page.goto("http://localhost:8766/index.html");
	await expect(page.locator(".reveal")).toHaveCount(0);
	await expect(page.locator(".hint-click")).toBeVisible();
	await context.close();
});

test("sticky bar never hides a keyboard-focused control", async ({ page }) => {
	await page.goto("/index.html");
	for (let step = 0; step < 14; step++) {
		await page.keyboard.press("Tab");
		const box = await page.evaluate(() => {
			const element = document.activeElement;
			const bar = document.querySelector(".bar").getBoundingClientRect();
			const rect = element.getBoundingClientRect();
			return {
				exempt: element.closest(".bar") !== null || element.classList.contains("skip"),
				top: rect.top,
				barBottom: bar.bottom,
			};
		});
		if (!box.exempt) expect(box.top).toBeGreaterThanOrEqual(box.barBottom - 1);
	}
});
