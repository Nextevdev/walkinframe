const REVEAL_SELECTOR = ".promise, .tile, .steps li, .steps-note, .close h2, .close-side";
const STAGGER_MS = 70;
const MAX_STAGGER_STEPS = 4;

/**
 * Scroll entrance. Content stays visible when JS, IntersectionObserver or motion is unavailable.
 * @param {Document} doc
 * @param {import("./env.js").Env} env
 * @returns {number} how many elements were wired for reveal
 */
export function initReveal(doc, env) {
	const win = doc.defaultView;
	if (env.reduceMotion || !win || !("IntersectionObserver" in win)) return 0;

	const targets = [...doc.querySelectorAll(REVEAL_SELECTOR)];
	doc.documentElement.classList.add("js-motion");

	const observer = new win.IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add("is-in");
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
	);

	targets.forEach((element, index) => {
		const siblings = element.parentElement ? [...element.parentElement.children].indexOf(element) : index;
		element.style.setProperty("--d", `${Math.min(siblings, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
		element.classList.add("reveal");
		observer.observe(element);
	});
	return targets.length;
}

/**
 * Skeleton for photos: a shimmering placeholder until each image has decoded.
 * @param {Document} doc
 * @returns {number} how many images were tracked
 */
export function initImageSkeleton(doc) {
	const buttons = [...doc.querySelectorAll(".tile-btn")];
	for (const button of buttons) {
		const image = button.querySelector("img");
		const done = () => button.classList.add("is-loaded");
		if (!image || image.complete) {
			done();
			continue;
		}
		image.addEventListener("load", done, { once: true });
		image.addEventListener("error", done, { once: true });
	}
	doc.documentElement.classList.add("js-skeleton");
	return buttons.length;
}
