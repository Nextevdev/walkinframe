const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const hoverCapable = window.matchMedia("(hover: hover)");
const EMAIL = atob("d2Fsa2luZnJhbWUuc3R1ZGlvQGdtYWlsLmNvbQ==");

function openMailto(subject) {
	location.href = "mailto:" + EMAIL + (subject ? "?subject=" + encodeURIComponent(subject) : "");
}

/* Hero reel: pause control, and no autoplay when the visitor asks for less motion. */
const reel = document.getElementById("reel");
const reelToggle = document.getElementById("reel-toggle");

function syncReelToggle() {
	reelToggle.textContent = reel.paused ? "Play" : "Pause";
}

if (reel && reelToggle) {
	if (reduceMotion.matches) {
		reel.removeAttribute("autoplay");
		reel.pause();
	}
	reelToggle.addEventListener("click", () => {
		if (reel.paused) {
			reel.play().catch(() => {});
		} else {
			reel.pause();
		}
	});
	reel.addEventListener("play", syncReelToggle);
	reel.addEventListener("pause", syncReelToggle);
	syncReelToggle();
}

/* Photo strip: the still opens into its clip. The state badge flips only once the clip is really playing. */
const tiles = [...document.querySelectorAll(".tile-btn")];

function mark(button, playing) {
	button.classList.toggle("is-playing", playing);
	button.setAttribute("aria-pressed", String(playing));
	button.querySelector(".tile-state").textContent = playing ? "Video" : "Photo";
}

function play(button) {
	const video = button.querySelector("video");
	video.currentTime = 0;
	video.play().catch(() => {});
}

function stop(button) {
	button.querySelector("video").pause();
	mark(button, false);
}

tiles.forEach((button) => {
	const video = button.querySelector("video");
	video.addEventListener("playing", () => mark(button, true));

	if (!reduceMotion.matches) {
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
		if (event.pointerType === "mouse" && !reduceMotion.matches) return;
		if (video.paused) {
			play(button);
		} else {
			stop(button);
		}
	});
});

/* Touch screens have no hover: the tile in view plays, one at a time. */
if (!hoverCapable.matches && !reduceMotion.matches && "IntersectionObserver" in window) {
	let current = null;
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const button = entry.target;
				if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
					if (current && current !== button) stop(current);
					current = button;
					play(button);
				} else if (current === button) {
					stop(button);
					current = null;
				}
			});
		},
		{ threshold: [0, 0.6] },
	);
	tiles.forEach((tile) => observer.observe(tile));
}

/* Mailto buttons: decode email on click (CSP-compatible, no javascript: href). */
document.querySelectorAll("[data-mailto]").forEach((el) => {
	el.addEventListener("click", (e) => {
		e.preventDefault();
		openMailto(el.dataset.mailto);
	});
});
