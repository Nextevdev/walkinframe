import { t } from "./i18n.js";

/**
 * Sets the state chip from a message key and remembers it, so a language change can redraw it.
 * @param {Element} button
 * @param {string} key
 */
export function setLabel(button, key) {
	const chip = button.querySelector(".tile-state");
	if (!chip) return;
	chip.dataset.chip = key;
	chip.textContent = t(key);
}

/**
 * @param {Element} button
 * @param {boolean} playing
 */
export function mark(button, playing) {
	button.classList.toggle("is-playing", playing);
	button.setAttribute("aria-pressed", String(playing));
	setLabel(button, playing ? "chip_video" : "chip_photo");
}

/**
 * Photo strip: the still opens into its clip, with a progress line and honest loading and error states.
 * @param {Document} doc
 * @param {import("./env.js").Env} env
 * @returns {number} how many tiles were wired
 */
export function initTiles(doc, env) {
	const tiles = [...doc.querySelectorAll(".tile-btn")];

	const play = (button) => {
		const video = button.querySelector("video");
		video.currentTime = 0;
		if (video.readyState < 3) setLabel(button, "chip_loading");
		video.play().catch((error) => {
			if (error.name !== "AbortError" && error.name !== "NotAllowedError") setLabel(button, "chip_unavailable");
		});
	};
	const stop = (button) => {
		button.querySelector("video").pause();
		mark(button, false);
		button.style.setProperty("--p", "0");
	};

	for (const button of tiles) {
		const video = button.querySelector("video");
		const line = doc.createElement("span");
		line.className = "tile-progress";
		line.setAttribute("aria-hidden", "true");
		button.append(line);

		/* The source photo stays in the corner while the clip plays, so the camera move reads against it. */
		const photo = button.querySelector("img");
		if (photo) {
			const ref = doc.createElement("span");
			ref.className = "tile-ref";
			ref.setAttribute("aria-hidden", "true");
			ref.style.backgroundImage = `url("${photo.getAttribute("src")}")`;
			const caption = doc.createElement("span");
			caption.dataset.i18n = "source_photo";
			caption.textContent = t("source_photo");
			ref.append(caption);
			button.append(ref);
		}

		video.addEventListener("playing", () => mark(button, true));
		video.addEventListener("error", () => setLabel(button, "chip_unavailable"));
		video.addEventListener("timeupdate", () => {
			if (video.duration > 0) button.style.setProperty("--p", String(video.currentTime / video.duration));
		});

		if (!env.reduceMotion) {
			/* Mouse only: touch taps on hybrid laptops would otherwise play and stop at once. */
			button.addEventListener("pointerenter", (event) => {
				if (event.pointerType === "mouse") play(button);
			});
			button.addEventListener("pointerleave", (event) => {
				if (event.pointerType === "mouse") stop(button);
			});
			button.addEventListener("focus", () => {
				if (button.matches(":focus-visible")) play(button);
			});
			button.addEventListener("blur", () => stop(button));
		}

		button.addEventListener("click", (event) => {
			if (event.pointerType === "mouse" && !env.reduceMotion) return;
			if (video.paused) play(button);
			else stop(button);
		});
	}

	/* A language change redraws each chip in its current state. */
	doc.addEventListener("languagechange", () => {
		for (const button of tiles) setLabel(button, button.querySelector(".tile-state")?.dataset.chip ?? "chip_photo");
	});

	/* Touch screens have no hover: the tile in view plays, one at a time. */
	const win = doc.defaultView;
	if (win && !env.hoverCapable && !env.reduceMotion && "IntersectionObserver" in win) {
		let current = null;
		const observer = new win.IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const button = entry.target;
					if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
						if (current && current !== button) stop(current);
						current = button;
						play(button);
					} else if (current === button) {
						stop(button);
						current = null;
					}
				}
			},
			{ threshold: [0, 0.6] },
		);
		for (const tile of tiles) observer.observe(tile);
	}
	return tiles.length;
}
