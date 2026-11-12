/**
 * @typedef {{ reduceMotion: boolean, hoverCapable: boolean }} Env
 */

/**
 * Reads the visitor's motion and pointer preferences once.
 * @param {Window} win
 * @returns {Env}
 */
export function readEnv(win) {
	const match = (query) => (typeof win.matchMedia === "function" ? win.matchMedia(query).matches : false);
	return {
		reduceMotion: match("(prefers-reduced-motion: reduce)"),
		hoverCapable: match("(hover: hover)"),
	};
}
