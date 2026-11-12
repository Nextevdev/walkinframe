import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { initTiles, mark, setLabel } from "../../src/tiles.js";
import { env, loadPage, stubMedia, stubObserver } from "./helpers.js";

afterEach(() => {
	vi.unstubAllGlobals();
	delete window.IntersectionObserver;
});

function pointer(type, pointerType) {
	const event = new Event(type);
	Object.defineProperty(event, "pointerType", { value: pointerType });
	return event;
}

describe("tiles", () => {
	let media;
	beforeEach(() => {
		loadPage();
		media = stubMedia();
	});

	it("setLabel and mark keep chip and aria in step", () => {
		const button = document.querySelector(".tile-btn");
		setLabel(button, "chip_loading");
		expect(button.querySelector(".tile-state").textContent).toBe("Loading");
		mark(button, true);
		expect(button.getAttribute("aria-pressed")).toBe("true");
		expect(button.querySelector(".tile-state").textContent).toBe("Video");
		mark(button, false);
		expect(button.getAttribute("aria-pressed")).toBe("false");
		expect(button.querySelector(".tile-state").textContent).toBe("Photo");
	});

	it("wires every tile and adds a progress line", () => {
		expect(initTiles(document, env())).toBe(6);
		expect(document.querySelectorAll(".tile-progress")).toHaveLength(6);
	});

	it("plays on mouse hover, shows Loading, flips to Video, stops on leave", () => {
		initTiles(document, env());
		const button = document.querySelector(".tile-btn");
		const video = button.querySelector("video");

		button.dispatchEvent(pointer("pointerenter", "mouse"));
		expect(media.play).toHaveBeenCalled();
		expect(button.querySelector(".tile-state").textContent).toBe("Loading");

		video.dispatchEvent(new Event("playing"));
		expect(button.classList.contains("is-playing")).toBe(true);

		button.dispatchEvent(pointer("pointerleave", "mouse"));
		expect(button.classList.contains("is-playing")).toBe(false);
		expect(button.style.getPropertyValue("--p")).toBe("0");
	});

	it("ignores touch pointers on enter and leave", () => {
		initTiles(document, env());
		const button = document.querySelector(".tile-btn");
		button.dispatchEvent(pointer("pointerenter", "touch"));
		expect(media.play).not.toHaveBeenCalled();
	});

	it("reports Unavailable when the clip errors or cannot start", async () => {
		initTiles(document, env());
		const button = document.querySelector(".tile-btn");
		button.querySelector("video").dispatchEvent(new Event("error"));
		expect(button.querySelector(".tile-state").textContent).toBe("Unavailable");

		const second = document.querySelectorAll(".tile-btn")[1];
		const failure = Object.assign(new Error("nope"), { name: "NotSupportedError" });
		media.play.mockImplementationOnce(() => Promise.reject(failure));
		second.dispatchEvent(pointer("pointerenter", "mouse"));
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(second.querySelector(".tile-state").textContent).toBe("Unavailable");
	});

	it("does not call an autoplay block or abort a failure", async () => {
		initTiles(document, env());
		const button = document.querySelector(".tile-btn");
		const blocked = Object.assign(new Error("blocked"), { name: "NotAllowedError" });
		media.play.mockImplementationOnce(() => Promise.reject(blocked));
		button.dispatchEvent(pointer("pointerenter", "mouse"));
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(button.querySelector(".tile-state").textContent).not.toBe("Unavailable");
	});

	it("tracks clip progress in --p", () => {
		initTiles(document, env());
		const button = document.querySelector(".tile-btn");
		const video = button.querySelector("video");
		Object.defineProperty(video, "duration", { value: 10, configurable: true });
		video.currentTime = 4;
		video.dispatchEvent(new Event("timeupdate"));
		expect(button.style.getPropertyValue("--p")).toBe("0.4");
	});

	it("toggles by click under reduced motion and does not hover-play", () => {
		initTiles(document, env({ reduceMotion: true }));
		const button = document.querySelector(".tile-btn");
		button.dispatchEvent(pointer("pointerenter", "mouse"));
		expect(media.play).not.toHaveBeenCalled();

		const video = button.querySelector("video");
		Object.defineProperty(video, "paused", { value: true, configurable: true });
		button.dispatchEvent(Object.assign(new MouseEvent("click"), { pointerType: "touch" }));
		expect(media.play).toHaveBeenCalled();
	});

	it("plays only the tile in view on touch screens, one at a time", () => {
		const observers = stubObserver();
		initTiles(document, env({ hoverCapable: false }));
		const [observer] = observers;
		const [a, b] = document.querySelectorAll(".tile-btn");

		observer.fire([{ isIntersecting: true, intersectionRatio: 0.8, target: a }]);
		a.querySelector("video").dispatchEvent(new Event("playing"));
		observer.fire([{ isIntersecting: true, intersectionRatio: 0.9, target: b }]);
		expect(a.classList.contains("is-playing")).toBe(false);

		observer.fire([{ isIntersecting: false, intersectionRatio: 0, target: b }]);
		expect(b.classList.contains("is-playing")).toBe(false);
	});
});
