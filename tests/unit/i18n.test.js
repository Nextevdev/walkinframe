import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { applyLanguage, initI18n, LANGUAGES, messages, pickLanguage, t } from "../../src/i18n.js";
import { initReel } from "../../src/reel.js";
import { initTiles, mark, setLabel } from "../../src/tiles.js";
import { env, loadPage, stubMedia } from "./helpers.js";

/* jsdom opens pages on an opaque origin, which has no localStorage. */
const store = new Map();
const fakeStorage = {
	getItem: (key) => store.get(key) ?? null,
	setItem: (key, value) => store.set(key, String(value)),
	clear: () => store.clear(),
};

beforeEach(() => {
	Object.defineProperty(window, "localStorage", { value: fakeStorage, configurable: true });
});

afterEach(() => {
	applyLanguage(document, "en");
	store.clear();
});

describe("pickLanguage", () => {
	it("prefers ?lang=, then the saved choice, then the browser, then English", () => {
		expect(pickLanguage({ search: "?lang=it", stored: "es", languages: ["pt-PT"] })).toBe("it");
		expect(pickLanguage({ search: "", stored: "es", languages: ["pt-PT"] })).toBe("es");
		expect(pickLanguage({ languages: ["fr-FR", "pt-BR"] })).toBe("pt");
		expect(pickLanguage({ languages: ["de"] })).toBe("en");
		expect(pickLanguage({ search: "?lang=xx", stored: "yy" })).toBe("en");
		expect(pickLanguage({})).toBe("en");
	});
});

describe("messages", () => {
	it("has the same keys in every language", () => {
		expect(LANGUAGES).toEqual(["pt", "it", "es", "en"]);
		const english = Object.keys(messages.en).sort();
		for (const language of LANGUAGES) {
			expect(Object.keys(messages[language]).sort(), language).toEqual(english);
			for (const key of english) expect(messages[language][key].trim(), `${language}:${key}`).not.toBe("");
		}
	});

	it("falls back to English, then to the key", () => {
		applyLanguage(document, "xx");
		expect(document.documentElement.lang).toBe("en");
		expect(t("no_such_key")).toBe("no_such_key");
	});
});

describe("applyLanguage on the real page", () => {
	beforeEach(() => {
		loadPage();
		stubMedia();
	});

	it("translates text, attributes, title, description and mail links", () => {
		applyLanguage(document, "pt");
		expect(document.documentElement.lang).toBe("pt");
		expect(document.title).toBe(t("title"));
		expect(document.querySelector("h1 .h-heavy").textContent).toBe("As fotos do anúncio, em vídeo de visita.");
		expect(document.querySelector(".tile-a img").getAttribute("alt")).toContain("piscina");
		expect(document.querySelector(".tile-a .tile-btn").getAttribute("aria-label")).toBe(
			"Reproduzir vídeo: Jardim e piscina",
		);
		expect(document.querySelector('[data-lang="pt"]').getAttribute("aria-checked")).toBe("true");
		expect(document.querySelector('[data-lang="en"]').getAttribute("aria-checked")).toBe("false");

		const href = document.querySelector('a[data-mail="request"]').getAttribute("href");
		expect(href).toContain("mailto:walkinframe.studio@gmail.com?subject=Pedido%20de%20amostra%20gratuita");
		expect(href).toContain(encodeURIComponent("Agência:"));
	});

	it("covers every translatable element in all four languages", () => {
		for (const language of LANGUAGES) {
			applyLanguage(document, language);
			for (const element of document.querySelectorAll("[data-i18n]")) {
				expect(element.textContent.trim(), `${language}:${element.dataset.i18n}`).not.toBe("");
				expect(element.textContent).not.toBe(element.dataset.i18n);
			}
		}
	});

	it("redraws the reel toggle and tile chips in the new language", () => {
		initReel(document, env());
		initTiles(document, env());
		const button = document.querySelector(".tile-btn");
		setLabel(button, "chip_unavailable");
		applyLanguage(document, "es");
		expect(button.querySelector(".tile-state").textContent).toBe("No disponible");
		expect(document.getElementById("reel-toggle").textContent).toBe("Reproducir");

		mark(button, true);
		expect(button.querySelector(".tile-state").textContent).toBe("Vídeo");
		applyLanguage(document, "it");
		expect(button.querySelector(".tile-state").textContent).toBe("Video");
		expect(document.querySelector(".tile-ref span").textContent).toBe("Foto originale");
	});
});

describe("initI18n", () => {
	beforeEach(loadPage);

	it("starts from the saved language and saves a new choice from the selector", () => {
		window.localStorage.setItem("wif-lang", "it");
		expect(initI18n(document, window)).toBe("it");
		expect(document.documentElement.lang).toBe("it");

		document.querySelector('[data-lang="es"]').click();
		expect(document.documentElement.lang).toBe("es");
		expect(window.localStorage.getItem("wif-lang")).toBe("es");
	});

	it("still works when storage is blocked", () => {
		const blocked = {
			location: { search: "" },
			navigator: { languages: ["pt-PT"] },
			get localStorage() {
				throw new Error("blocked");
			},
		};
		expect(initI18n(document, blocked)).toBe("pt");
		expect(() => document.querySelector('[data-lang="en"]').click()).not.toThrow();
		expect(document.documentElement.lang).toBe("en");
	});
});
