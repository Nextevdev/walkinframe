import { currentLanguage, LANGUAGES } from "./i18n.js";

/** Two edges, two springs: the leading edge is quick and loose, the trailing edge slower and tighter. */
export const FAST = { omega: 19, zeta: 0.55 };
export const SLOW = { omega: 11, zeta: 0.72 };
const SETTLE_SECONDS = 1.4;
const EDGE_INSET_PX = 3;
const NEAR_PX = 80;

/**
 * Damped spring step response: 0 at t = 0, settling on 1.
 * @param {number} t seconds since the tap
 * @param {{ omega: number, zeta: number }} spring
 * @returns {number}
 */
export function spring(t, { omega, zeta }) {
	if (t <= 0) return 0;
	const damped = omega * Math.sqrt(1 - zeta * zeta);
	const decay = zeta * omega;
	return 1 - Math.exp(-decay * t) * (Math.cos(damped * t) + (decay / damped) * Math.sin(damped * t));
}

/**
 * Pill edges in pixels for a move between two segments, `t` seconds after the tap.
 * @param {{ from: number, to: number, t: number, segment: number, width: number }} move
 * @returns {{ left: number, right: number }}
 */
export function pillEdges({ from, to, t, segment, width }) {
	const movingRight = to >= from;
	const leading = from + (to - from) * spring(t, FAST);
	const trailing = from + (to - from) * spring(t, SLOW);
	const leftPosition = movingRight ? trailing : leading;
	const rightPosition = movingRight ? leading : trailing;
	const left = Math.max(EDGE_INSET_PX, EDGE_INSET_PX + leftPosition * segment);
	const right = Math.min(width - EDGE_INSET_PX, EDGE_INSET_PX + (rightPosition + 1) * segment);
	return { left, right: Math.max(right, left) };
}

/**
 * A label turns dark as the pill reaches it: 0 = resting colour, 1 = fully under the pill.
 * @param {number} pillMiddle
 * @param {number} segmentCenter
 * @returns {number}
 */
export function closeness(pillMiddle, segmentCenter) {
	return Math.min(1, Math.max(0, 1 - Math.abs(pillMiddle - segmentCenter) / NEAR_PX));
}

/**
 * Segmented language switch. The pill stretches toward the chosen tab and snaps back as it lands.
 * Arrow keys move the choice; under reduced motion the pill jumps.
 * @param {Document} doc
 * @param {import("./env.js").Env} env
 * @returns {boolean} whether the switch was found
 */
export function initLangSwitch(doc, env) {
	const group = doc.getElementById("lang");
	const pill = /** @type {HTMLElement | null} */ (group?.querySelector(".lang-pill"));
	if (!group || !pill) return false;
	const win = doc.defaultView;
	const radios = [...group.querySelectorAll("[data-lang]")];
	let shown = LANGUAGES.indexOf(currentLanguage());
	let frame = 0;

	const geometry = () => {
		const width = group.clientWidth;
		return { width, segment: (width - 2 * EDGE_INSET_PX) / radios.length };
	};
	const paint = (left, right) => {
		const { segment } = geometry();
		pill.style.transform = `translateX(${left}px)`;
		pill.style.width = `${right - left}px`;
		const middle = (left + right) / 2;
		radios.forEach((radio, index) => {
			const center = EDGE_INSET_PX + segment * (index + 0.5);
			radio.style.setProperty("--near", closeness(middle, center).toFixed(3));
		});
	};
	const rest = (index) => {
		const { segment } = geometry();
		paint(EDGE_INSET_PX + index * segment, EDGE_INSET_PX + (index + 1) * segment);
	};

	const moveTo = (index) => {
		if (!win) return;
		win.cancelAnimationFrame?.(frame);
		const from = shown;
		shown = index;
		if (env.reduceMotion || from === index || !win.requestAnimationFrame) {
			rest(index);
			return;
		}
		const { segment, width } = geometry();
		const start = win.performance.now();
		const tick = (now) => {
			if (!group.isConnected) return;
			const t = (now - start) / 1000;
			if (t >= SETTLE_SECONDS) {
				rest(index);
				return;
			}
			const edges = pillEdges({ from, to: index, t, segment, width });
			paint(edges.left, edges.right);
			frame = win.requestAnimationFrame(tick);
		};
		frame = win.requestAnimationFrame(tick);
	};

	doc.addEventListener("languagechange", () => moveTo(LANGUAGES.indexOf(currentLanguage())));
	win?.addEventListener("resize", () => rest(shown));

	/* A ring answers the press, so the tap is felt before the pill arrives. */
	group.addEventListener("pointerdown", (event) => {
		const radio = /** @type {HTMLElement} */ (event.target).closest("[data-lang]");
		if (!radio || env.reduceMotion) return;
		const ring = doc.createElement("span");
		ring.className = "lang-ring";
		ring.setAttribute("aria-hidden", "true");
		radio.append(ring);
		ring.addEventListener("animationend", () => ring.remove(), { once: true });
		setTimeout(() => ring.remove(), 600);
	});

	group.addEventListener("keydown", (event) => {
		const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
		if (!step) return;
		event.preventDefault();
		const index = (radios.indexOf(/** @type {Element} */ (doc.activeElement)) + step + radios.length) % radios.length;
		radios[index].focus();
		radios[index].click();
	});

	rest(shown);
	return true;
}
