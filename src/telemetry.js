/**
 * Observability, off by default.
 *
 * The page promises visitors no cookies and no third parties, and its CSP has `connect-src 'none'`.
 * So nothing leaves the browser until an owner deliberately sets `enabled`, picks adapters,
 * and relaxes the CSP for the chosen endpoint. No identifiers are collected: events carry
 * a name, a value and the page path only.
 *
 * @typedef {{ name: string, value?: number, detail?: string, path: string }} TelemetryEvent
 * @typedef {{ name: string, send: (event: TelemetryEvent) => void }} Adapter
 */

/**
 * OpenTelemetry-compatible: posts a minimal OTLP/HTTP JSON log record to your own collector.
 * @param {string} endpoint e.g. "https://otel.example.com/v1/logs" (self-hosted)
 * @returns {Adapter}
 */
export function otlpAdapter(endpoint) {
	return {
		name: "otlp",
		send(event) {
			const body = JSON.stringify({
				resourceLogs: [
					{
						resource: { attributes: [{ key: "service.name", value: { stringValue: "walkinframe-site" } }] },
						scopeLogs: [
							{
								logRecords: [
									{
										body: { stringValue: event.name },
										attributes: [
											{ key: "value", value: { doubleValue: event.value ?? 0 } },
											{ key: "detail", value: { stringValue: event.detail ?? "" } },
											{ key: "path", value: { stringValue: event.path } },
										],
									},
								],
							},
						],
					},
				],
			});
			navigator.sendBeacon?.(endpoint, new Blob([body], { type: "application/json" }));
		},
	};
}

/**
 * Forwards errors to a vendor SDK that the owner self-hosts and loads first (no CDN).
 * Works with `window.Sentry`, `window.DD_RUM` or `window.newrelic`; silently does nothing if absent.
 * @param {"sentry" | "datadog" | "newrelic"} vendor
 * @param {Window} win
 * @returns {Adapter}
 */
export function vendorAdapter(vendor, win) {
	return {
		name: vendor,
		send(event) {
			if (event.name !== "error") return;
			const error = new Error(event.detail ?? "error");
			if (vendor === "sentry") win.Sentry?.captureException(error);
			else if (vendor === "datadog") win.DD_RUM?.addError(error);
			else win.newrelic?.noticeError(error);
		},
	};
}

/**
 * @param {{ enabled: boolean, adapters: Adapter[] }} config
 * @param {Window} win
 * @returns {{ track: (name: string, value?: number, detail?: string) => void, active: boolean }}
 */
export function createTelemetry(config, win) {
	const active = config.enabled && config.adapters.length > 0;
	const track = (name, value, detail) => {
		if (!active) return;
		const event = { name, value, detail, path: win.location.pathname };
		for (const adapter of config.adapters) {
			try {
				adapter.send(event);
			} catch {
				/* Telemetry must never break the page. */
			}
		}
	};

	if (active) {
		win.addEventListener("error", (event) => track("error", undefined, event.message));
		win.addEventListener("unhandledrejection", (event) => track("error", undefined, String(event.reason)));
		observeVitals(win, track);
	}
	return { track, active };
}

function observeVitals(win, track) {
	if (!("PerformanceObserver" in win)) return;
	let cls = 0;
	const watch = (type, handler) => {
		try {
			new win.PerformanceObserver((list) => list.getEntries().forEach(handler)).observe({ type, buffered: true });
		} catch {
			/* Entry type unsupported in this browser. */
		}
	};
	watch("largest-contentful-paint", (entry) => track("lcp", entry.startTime));
	watch("layout-shift", (entry) => {
		if (!entry.hadRecentInput) cls += entry.value;
	});
	win.addEventListener("pagehide", () => track("cls", cls));
}
