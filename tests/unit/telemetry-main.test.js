import { Blob as NodeBlob } from "node:buffer";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTelemetry, otlpAdapter, vendorAdapter } from "../../src/telemetry.js";
import { loadPage, stubMedia, stubObserver } from "./helpers.js";

afterEach(() => {
	vi.unstubAllGlobals();
	vi.resetModules();
	delete window.IntersectionObserver;
});

function fakeWindow() {
	const listeners = {};
	return {
		location: { pathname: "/" },
		addEventListener: (type, handler) => {
			listeners[type] = handler;
		},
		listeners,
	};
}

describe("createTelemetry", () => {
	it("is inert unless enabled with at least one adapter", () => {
		const send = vi.fn();
		const win = fakeWindow();
		expect(createTelemetry({ enabled: false, adapters: [{ name: "x", send }] }, win).active).toBe(false);
		expect(createTelemetry({ enabled: true, adapters: [] }, win).active).toBe(false);
		const { track } = createTelemetry({ enabled: false, adapters: [{ name: "x", send }] }, win);
		track("lcp", 1);
		expect(send).not.toHaveBeenCalled();
		expect(win.listeners.error).toBeUndefined();
	});

	it("sends events with the page path only and survives a failing adapter", () => {
		const good = vi.fn();
		const bad = vi.fn(() => {
			throw new Error("boom");
		});
		const win = fakeWindow();
		const telemetry = createTelemetry(
			{
				enabled: true,
				adapters: [
					{ name: "bad", send: bad },
					{ name: "good", send: good },
				],
			},
			win,
		);
		telemetry.track("lcp", 1200, "detail");
		expect(good).toHaveBeenCalledWith({ name: "lcp", value: 1200, detail: "detail", path: "/" });
	});

	it("captures errors and rejections", () => {
		const send = vi.fn();
		const win = fakeWindow();
		createTelemetry({ enabled: true, adapters: [{ name: "x", send }] }, win);
		win.listeners.error({ message: "bad thing" });
		win.listeners.unhandledrejection({ reason: "nope" });
		expect(send).toHaveBeenCalledWith(expect.objectContaining({ name: "error", detail: "bad thing" }));
		expect(send).toHaveBeenCalledWith(expect.objectContaining({ name: "error", detail: "nope" }));
	});

	it("reports layout shift on pagehide, ignoring shifts after input", () => {
		const send = vi.fn();
		const win = fakeWindow();
		const callbacks = {};
		win.PerformanceObserver = class {
			constructor(callback) {
				this.callback = callback;
			}
			observe({ type }) {
				callbacks[type] = this.callback;
			}
		};
		createTelemetry({ enabled: true, adapters: [{ name: "x", send }] }, win);
		callbacks["layout-shift"]({
			getEntries: () => [
				{ value: 0.05, hadRecentInput: false },
				{ value: 0.5, hadRecentInput: true },
			],
		});
		callbacks["largest-contentful-paint"]({ getEntries: () => [{ startTime: 900 }] });
		win.listeners.pagehide();
		expect(send).toHaveBeenCalledWith(expect.objectContaining({ name: "lcp", value: 900 }));
		expect(send).toHaveBeenCalledWith(expect.objectContaining({ name: "cls", value: 0.05 }));
	});
});

describe("adapters", () => {
	it("otlpAdapter posts an OTLP log record to the given endpoint", async () => {
		const sendBeacon = vi.fn();
		vi.stubGlobal("Blob", NodeBlob);
		vi.stubGlobal("navigator", { sendBeacon });
		otlpAdapter("https://otel.example.com/v1/logs").send({ name: "lcp", value: 1, path: "/" });
		const [url, blob] = sendBeacon.mock.calls[0];
		expect(url).toBe("https://otel.example.com/v1/logs");
		const body = JSON.parse(await blob.text());
		expect(body.resourceLogs[0].scopeLogs[0].logRecords[0].body.stringValue).toBe("lcp");
	});

	it("vendorAdapter forwards errors to Sentry, Datadog or New Relic only", () => {
		const win = {
			Sentry: { captureException: vi.fn() },
			DD_RUM: { addError: vi.fn() },
			newrelic: { noticeError: vi.fn() },
		};
		const event = { name: "error", detail: "x", path: "/" };
		vendorAdapter("sentry", win).send(event);
		vendorAdapter("datadog", win).send(event);
		vendorAdapter("newrelic", win).send(event);
		vendorAdapter("sentry", win).send({ name: "lcp", path: "/" });
		expect(win.Sentry.captureException).toHaveBeenCalledTimes(1);
		expect(win.DD_RUM.addError).toHaveBeenCalledTimes(1);
		expect(win.newrelic.noticeError).toHaveBeenCalledTimes(1);
	});

	it("vendorAdapter does nothing when the SDK is not loaded", () => {
		expect(() => vendorAdapter("sentry", {}).send({ name: "error", path: "/" })).not.toThrow();
	});
});

describe("main entry", () => {
	beforeEach(() => {
		loadPage();
		stubMedia();
	});

	it("composes every feature on the real page", async () => {
		stubObserver();
		window.matchMedia = () => ({ matches: false });
		await import("../../main.js");
		const root = document.documentElement.classList;
		expect(root.contains("js-skeleton")).toBe(true);
		expect(root.contains("js-motion")).toBe(true);
		expect(document.querySelectorAll(".tile-progress")).toHaveLength(6);
	});
});
