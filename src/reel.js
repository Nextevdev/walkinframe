import { currentLanguage, t } from "./i18n.js";

/**
 * @param {string} language
 * @returns {{ src: string, poster: string }}
 */
export function reelFiles(language) {
	return { src: `assets/media/reel-${language}.mp4`, poster: `assets/media/reel-poster-${language}.jpg` };
}

/**
 * Hero reel: pause control, progress bar, no autoplay under reduced motion,
 * and no playback while the reel is off screen.
 * @param {Document} doc
 * @param {import("./env.js").Env} env
 * @returns {boolean} whether the reel was found
 */
export function initReel(doc, env) {
	const reel = /** @type {HTMLVideoElement | null} */ (doc.getElementById("reel"));
	const toggle = doc.getElementById("reel-toggle");
	const bar = /** @type {HTMLElement | null} */ (doc.querySelector(".reel-progress i"));
	if (!reel || !toggle) return false;

	const sync = () => {
		toggle.textContent = t(reel.paused ? "play" : "pause");
	};
	const progress = () => {
		if (bar && reel.duration > 0) bar.style.transform = `scaleX(${reel.currentTime / reel.duration})`;
	};

	if (env.reduceMotion) {
		reel.removeAttribute("autoplay");
		reel.pause();
	}

	let pausedByUser = false;
	toggle.addEventListener("click", () => {
		if (reel.paused) {
			pausedByUser = false;
			reel.play().catch(() => {});
		} else {
			pausedByUser = true;
			reel.pause();
		}
	});
	reel.addEventListener("play", sync);
	reel.addEventListener("pause", sync);
	reel.addEventListener("timeupdate", progress);
	sync();

	/* Each language has its own render, with the room labels in that language. The new one picks up where the old stopped. */
	const useLanguage = () => {
		const files = reelFiles(currentLanguage());
		if (reel.getAttribute("src") !== files.src) {
			const resumeAt = reel.currentTime;
			const wasPlaying = !reel.paused;
			reel.setAttribute("poster", files.poster);
			reel.setAttribute("src", files.src);
			reel.addEventListener(
				"loadedmetadata",
				() => {
					if (resumeAt > 0 && resumeAt < reel.duration) reel.currentTime = resumeAt;
					if (wasPlaying) reel.play().catch(() => {});
				},
				{ once: true },
			);
			reel.load();
		}
		sync();
	};
	doc.addEventListener("languagechange", useLanguage);
	useLanguage();

	const win = doc.defaultView;
	if (win && "IntersectionObserver" in win && !env.reduceMotion) {
		new win.IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				if (!pausedByUser) reel.play().catch(() => {});
			} else if (!reel.paused) {
				reel.pause();
			}
		}).observe(reel);
	}
	return true;
}
