const FADE_MS = 450;

export function initPreview() {
	const preview = document.querySelector(".js-preview");
	if (!preview) return;

	document.body.style.overflow = "hidden";

	let finished = false;
	let fallbackId;

	const finish = () => {
		if (finished) return;
		finished = true;
		preview.removeEventListener("transitionend", onTransitionEnd);
		clearTimeout(fallbackId);
		preview.classList.add("is-fully-hidden");
		document.body.style.removeProperty("overflow");
	};

	const onTransitionEnd = (e) => {
		if (e.target !== preview || e.propertyName !== "opacity") return;
		finish();
	};

	const onWindowScrollDismiss = () => {
		dismiss();
	};

	const dismiss = () => {
		preview.removeEventListener("click", dismiss);
		preview.removeEventListener("keydown", onKeyDown);
		window.removeEventListener("scroll", onWindowScrollDismiss, true);
		window.removeEventListener("wheel", onWindowScrollDismiss);
		window.removeEventListener("touchmove", onWindowScrollDismiss);
		preview.classList.add("is-dismissed");
		preview.addEventListener("transitionend", onTransitionEnd);
		fallbackId = setTimeout(finish, FADE_MS + 80);
	};

	const onKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			dismiss();
		}
	};

	preview.addEventListener("click", dismiss);
	preview.addEventListener("keydown", onKeyDown);

	window.addEventListener("scroll", onWindowScrollDismiss, { capture: true, passive: true });
	window.addEventListener("wheel", onWindowScrollDismiss, { passive: true });
	window.addEventListener("touchmove", onWindowScrollDismiss, { passive: true });
}
