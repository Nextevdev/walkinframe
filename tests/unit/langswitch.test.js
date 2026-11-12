import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { applyLanguage } from "../../src/i18n.js";
import { closeness, FAST, initLangSwitch, pillEdges, SLOW, spring } from "../../src/langswitch.js";
import { initReel, reelFiles } from "../../src/reel.js";
import { env, loadPage, stubMedia } from "./helpers.js";

afterEach(() => {
	vi.useRealTimers();
	/* Remove the page first, so any animation still in flight stops instead of outliving the test. */
	document.body.innerHTML = "";
	applyLanguage(document, "en");
});

describe("spring", () => {
	it("is 0 before the tap, overshoots, then settles on 1", () => {
		expect(spring(-1, FAST)).toBe(0);
		expect(spring(0, FAST)).toBe(0);
		const peak = Math.max(...Array.from({ length: 100 }, (_, index) => spring(index / 100, FAST)));
		expect(peak).toBeGreaterThan(1);
		expect(spring(1.4, FAST)).toBeCloseTo(1, 3);
		expect(spring(1.4, SLOW)).toBeCloseTo(1, 3);
	});

	it("the fast spring leads the slow one", () => {
		expect(spring(0.1, FAST)).toBeGreaterThan(spring(0.1, SLOW));
	});
});

describe("pillEdges", () => {
	const base = { segment: 40, width: 166 };

	it("rests exactly on a segment", () => {
		expect(pillEdges({ ...base, from: 1, to: 3, t: 5 })).toEqual({ left: 123, right: 163 });
	});

	it("stretches while travelling right: the right edge leads", () => {
		const { left, right } = pillEdges({ ...base, from: 0, to: 3, t: 0.12 });
		expect(right - left).toBeGreaterThan(40);
	});

	it("stretches while travelling left: the left edge leads", () => {
		const { left, right } = pillEdges({ ...base, from: 3, to: 0, t: 0.12 });
		expect(right - left).toBeGreaterThan(40);
	});

	it("flattens against the ends instead of overshooting out of the control", () => {
		for (let t = 0; t < 1.4; t += 0.02) {
			const { left, right } = pillEdges({ ...base, from: 0, to: 3, t });
			expect(left).toBeGreaterThanOrEqual(3);
			expect(right).toBeLessThanOrEqual(163);
			expect(right).toBeGreaterThanOrEqual(left);
		}
	});
});

describe("closeness", () => {
	it("is 1 under the pill, fades to 0 at 80px, and never leaves 0..1", () => {
		expect(closeness(100, 100)).toBe(1);
		expect(closeness(100, 140)).toBe(0.5);
		expect(closeness(100, 300)).toBe(0);
	});
});

describe("initLangSwitch", () => {
	beforeEach(() => {
		loadPage();
		stubMedia();
		Object.defineProperty(document.getElementById("lang"), "clientWidth", { value: 166, configurable: true });
	});

	it("returns false without the control", () => {
		document.body.innerHTML = "";
		expect(initLangSwitch(document, env())).toBe(false);
	});

	it("rests the pill on the current language and dims the other labels", () => {
		applyLanguage(document, "es");
		expect(initLangSwitch(document, env())).toBe(true);
		const pill = document.querySelector(".lang-pill");
		expect(pill.style.transform).toBe("translateX(83px)");
		expect(pill.style.width).toBe("40px");
		const near = [...document.querySelectorAll("[data-lang]")].map((radio) =>
			Number(radio.style.getPropertyValue("--near")),
		);
		expect(near[2]).toBe(1);
		expect(near[0]).toBe(0);
	});

	it("jumps under reduced motion", () => {
		initLangSwitch(document, env({ reduceMotion: true }));
		applyLanguage(document, "pt");
		expect(document.querySelector(".lang-pill").style.transform).toBe("translateX(3px)");
	});

	it("animates between tabs and lands on the chosen one", async () => {
		vi.useFakeTimers();
		const frames = [];
		window.requestAnimationFrame = (callback) => frames.push(callback);
		window.cancelAnimationFrame = () => {};
		initLangSwitch(document, env());
		applyLanguage(document, "pt");

		let now = window.performance.now();
		const widths = [];
		while (frames.length) {
			now += 40;
			const next = frames.shift();
			next(now);
			widths.push(Number.parseFloat(document.querySelector(".lang-pill").style.width));
			if (widths.length > 100) break;
		}
		expect(Math.max(...widths)).toBeGreaterThan(40);
		expect(document.querySelector(".lang-pill").style.transform).toBe("translateX(3px)");
		expect(document.querySelector(".lang-pill").style.width).toBe("40px");
	});

	it("moves with the arrow keys and wraps around", () => {
		initLangSwitch(document, env({ reduceMotion: true }));
		const radios = [...document.querySelectorAll("[data-lang]")];
		const press = (key) =>
			document.getElementById("lang").dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));

		radios[3].focus();
		press("ArrowRight");
		expect(document.activeElement).toBe(radios[0]);
		press("ArrowLeft");
		expect(document.activeElement).toBe(radios[3]);
		press("Tab");
		expect(document.activeElement).toBe(radios[3]);
	});

	it("shows a ring on press and removes it", () => {
		vi.useFakeTimers();
		initLangSwitch(document, env());
		const radio = document.querySelector('[data-lang="it"]');
		radio.dispatchEvent(new Event("pointerdown", { bubbles: true }));
		expect(radio.querySelector(".lang-ring")).not.toBeNull();
		vi.advanceTimersByTime(700);
		expect(radio.querySelector(".lang-ring")).toBeNull();
	});
});

describe("reel per language", () => {
	beforeEach(() => {
		loadPage();
		stubMedia();
	});

	it("names the render and poster for each language", () => {
		expect(reelFiles("it")).toEqual({ src: "assets/media/reel-it.mp4", poster: "assets/media/reel-poster-it.jpg" });
	});

	it("swaps the video and keeps the position when the language changes", () => {
		initReel(document, env());
		const reel = document.getElementById("reel");
		reel.currentTime = 12;
		Object.defineProperty(reel, "duration", { value: 26.7, configurable: true });
		applyLanguage(document, "pt");
		expect(reel.getAttribute("src")).toBe("assets/media/reel-pt.mp4");
		expect(reel.getAttribute("poster")).toBe("assets/media/reel-poster-pt.jpg");

		reel.dispatchEvent(new Event("loadedmetadata"));
		expect(reel.currentTime).toBe(12);
	});

	it("does not reload when the video already matches", () => {
		initReel(document, env());
		const reel = document.getElementById("reel");
		const before = reel.getAttribute("src");
		applyLanguage(document, "en");
		expect(reel.getAttribute("src")).toBe(before);
	});
});
