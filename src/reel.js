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
		toggle.textContent = reel.paused ? "Play" : "Pause";
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
