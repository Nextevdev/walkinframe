import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { initCopy } from "../../src/copy.js";
import { initReel } from "../../src/reel.js";
import { env, loadPage, stubMedia, stubObserver } from "./helpers.js";

afterEach(() => {
	vi.unstubAllGlobals();
	vi.useRealTimers();
	delete window.IntersectionObserver;
});

describe("initReel", () => {
	beforeEach(() => {
		loadPage();
		stubMedia();
	});

	it("returns false when the reel is missing", () => {
		document.body.innerHTML = "";
		expect(initReel(document, env())).toBe(false);
	});

	it("labels the toggle and pauses or plays on click", () => {
		expect(initReel(document, env())).toBe(true);
		const toggle = document.getElementById("reel-toggle");
		const reel = document.getElementById("reel");
		Object.defineProperty(reel, "paused", { value: false, configurable: true });
		reel.dispatchEvent(new Event("play"));
		expect(toggle.textContent).toBe("Pause");

		toggle.click();
		expect(reel.paused).toBe(true);
		expect(toggle.textContent).toBe("Play");

		toggle.click();
		expect(reel.paused).toBe(false);
		expect(toggle.textContent).toBe("Pause");
	});

	it("removes autoplay under reduced motion", () => {
		initReel(document, env({ reduceMotion: true }));
		const reel = document.getElementById("reel");
		expect(reel.hasAttribute("autoplay")).toBe(false);
		expect(document.getElementById("reel-toggle").textContent).toBe("Play");
	});

	it("draws progress from currentTime and duration", () => {
		initReel(document, env());
		const reel = document.getElementById("reel");
		Object.defineProperty(reel, "duration", { value: 20, configurable: true });
		reel.currentTime = 5;
		reel.dispatchEvent(new Event("timeupdate"));
		expect(document.querySelector(".reel-progress i").style.transform).toBe("scaleX(0.25)");
	});

	it("pauses off screen and resumes unless the visitor paused it", () => {
		const observers = stubObserver();
		initReel(document, env());
		const reel = document.getElementById("reel");
		const [observer] = observers;

		Object.defineProperty(reel, "paused", { value: false, configurable: true });
		observer.fire([{ isIntersecting: false }]);
		expect(reel.paused).toBe(true);
		observer.fire([{ isIntersecting: true }]);
		expect(reel.paused).toBe(false);

		document.getElementById("reel-toggle").click();
		expect(reel.paused).toBe(true);
		observer.fire([{ isIntersecting: false }]);
		observer.fire([{ isIntersecting: true }]);
		expect(reel.paused).toBe(true);
	});
});

describe("initCopy", () => {
	beforeEach(loadPage);

	it("returns false when the control is missing", () => {
		document.body.innerHTML = "";
		expect(initCopy(document)).toBe(false);
	});

	it("copies the address, announces it, then clears the message", async () => {
		vi.useFakeTimers();
		const writeText = vi.fn(() => Promise.resolve());
		Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
		initCopy(document);

		document.getElementById("copy-mail").click();
		await vi.advanceTimersByTimeAsync(0);
		expect(writeText).toHaveBeenCalledWith("walkinframe.studio@gmail.com");
		const status = document.getElementById("copy-status");
		expect(status.textContent).toBe("Copied");
		expect(status.classList.contains("is-shown")).toBe(true);

		await vi.advanceTimersByTimeAsync(3000);
		expect(status.textContent).toBe("");
		expect(status.classList.contains("is-shown")).toBe(false);
	});

	it("tells the visitor how to copy by hand when the clipboard is blocked", async () => {
		Object.defineProperty(navigator, "clipboard", {
			value: { writeText: () => Promise.reject(new Error("denied")) },
			configurable: true,
		});
		initCopy(document);
		document.getElementById("copy-mail").click();
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(document.getElementById("copy-status").textContent).toBe("Select the address above to copy it");
	});
});
