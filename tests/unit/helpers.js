import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { vi } from "vitest";

const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const bodyMarkup = html.match(/<body>([\s\S]*)<\/body>/)?.[1].replace(/<script[\s\S]*?<\/script>/g, "") ?? "";

/** Loads the real page markup into the jsdom document. */
export function loadPage() {
	document.documentElement.className = "";
	document.body.innerHTML = bodyMarkup;
}

/** Records every IntersectionObserver so tests can fire entries by hand. */
export function stubObserver() {
	const instances = [];
	class FakeObserver {
		constructor(callback) {
			this.callback = callback;
			this.observed = [];
			instances.push(this);
		}
		observe(element) {
			this.observed.push(element);
		}
		unobserve(element) {
			this.observed = this.observed.filter((item) => item !== element);
		}
		fire(entries) {
			this.callback(entries, this);
		}
	}
	vi.stubGlobal("IntersectionObserver", FakeObserver);
	window.IntersectionObserver = FakeObserver;
	return instances;
}

/** jsdom does not implement media playback. */
export function stubMedia() {
	const play = vi.fn(() => Promise.resolve());
	const pause = vi.fn(function pause() {
		Object.defineProperty(this, "paused", { value: true, configurable: true });
	});
	Object.defineProperty(HTMLMediaElement.prototype, "play", {
		configurable: true,
		value: function playStub() {
			Object.defineProperty(this, "paused", { value: false, configurable: true });
			this.dispatchEvent(new Event("play"));
			return play();
		},
	});
	Object.defineProperty(HTMLMediaElement.prototype, "pause", {
		configurable: true,
		value: function pauseStub() {
			pause.call(this);
			this.dispatchEvent(new Event("pause"));
		},
	});
	return { play, pause };
}

export const env = (overrides = {}) => ({ reduceMotion: false, hoverCapable: true, ...overrides });
