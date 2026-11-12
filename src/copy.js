const RESET_MS = 3000;

/**
 * Copy-address control for visitors on webmail or with no mail app.
 * @param {Document} doc
 * @returns {boolean} whether the control was found
 */
export function initCopy(doc) {
	const button = doc.getElementById("copy-mail");
	const status = doc.getElementById("copy-status");
	const link = doc.getElementById("mail-addr");
	if (!button || !status || !link) return false;

	button.addEventListener("click", async () => {
		const address = (link.textContent ?? "").trim();
		try {
			await doc.defaultView.navigator.clipboard.writeText(address);
			status.textContent = "Copied";
		} catch {
			status.textContent = "Select the address above to copy it";
		}
		status.classList.add("is-shown");
		setTimeout(() => {
			status.classList.remove("is-shown");
			status.textContent = "";
		}, RESET_MS);
	});
	return true;
}
