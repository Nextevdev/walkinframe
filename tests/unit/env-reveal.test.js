import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readEnv } from "../../src/env.js";
import { initImageSkeleton, initReveal } from "../../src/reveal.js";
import { env, loadPage, stubObserver } from "./helpers.js";

afterEach(() => {
	vi.unstubAllGlobals();
	delete window.IntersectionObserver;
});

describe("readEnv", () => {
	it("reads both media queries", () => {
		const win = { matchMedia: (query) => ({ matches: query.includes("reduce") }) };
		expect(readEnv(win)).toEqual({ reduceMotion: true, hoverCapable: false });
	});

	it("falls back to false when matchMedia is missing", () => {
		expect(readEnv({})).toEqual({ reduceMotion: false, hoverCapable: false });
	});
});

describe("initReveal", () => {
	beforeEach(loadPage);

	it("does nothing under reduced motion", () => {
		stubObserver();
		expect(initReveal(document, env({ reduceMotion: true }))).toBe(0);
		expect(document.documentElement.classList.contains("js-motion")).toBe(false);
		expect(document.querySelector(".reveal")).toBeNull();
	});

	it("does nothing without IntersectionObserver", () => {
		expect(initReveal(document, env())).toBe(0);
		expect(document.querySelector(".reveal")).toBeNull();
	});

	it("wires targets, staggers siblings and reveals once", () => {
		const observers = stubObserver();
		const count = initReveal(document, env());
		expect(count).toBeGreaterThan(5);
		expect(document.documentElement.classList.contains("js-motion")).toBe(true);

		const steps = [...document.querySelectorAll(".steps li")];
		expect(steps.map((item) => item.style.getPropertyValue("--d"))).toEqual(["0ms", "70ms", "140ms"]);

		const [observer] = observers;
		observer.fire([{ isIntersecting: false, target: steps[0] }]);
		expect(steps[0].classList.contains("is-in")).toBe(false);
		observer.fire([{ isIntersecting: true, target: steps[0] }]);
		expect(steps[0].classList.contains("is-in")).toBe(true);
		expect(observer.observed).not.toContain(steps[0]);
	});

	it("caps the stagger so late siblings do not wait", () => {
		stubObserver();
		initReveal(document, env());
		const delays = [...document.querySelectorAll(".tiles .tile")].map((tile) =>
			Number.parseInt(tile.style.getPropertyValue("--d"), 10),
		);
		expect(Math.max(...delays)).toBeLessThanOrEqual(4 * 70);
	});
});

describe("initImageSkeleton", () => {
	beforeEach(loadPage);

	it("marks decoded images as loaded and waits for the rest", () => {
		const buttons = [...document.querySelectorAll(".tile-btn")];
		const [first, second] = buttons.map((button) => button.querySelector("img"));
		Object.defineProperty(first, "complete", { value: true });
		Object.defineProperty(second, "complete", { value: false });
		for (const image of buttons.slice(2).map((button) => button.querySelector("img"))) {
			Object.defineProperty(image, "complete", { value: false });
		}

		expect(initImageSkeleton(document)).toBe(6);
		expect(buttons[0].classList.contains("is-loaded")).toBe(true);
		expect(buttons[1].classList.contains("is-loaded")).toBe(false);
		expect(document.documentElement.classList.contains("js-skeleton")).toBe(true);

		second.dispatchEvent(new Event("load"));
		expect(buttons[1].classList.contains("is-loaded")).toBe(true);
		buttons[2].querySelector("img").dispatchEvent(new Event("error"));
		expect(buttons[2].classList.contains("is-loaded")).toBe(true);
	});
});
