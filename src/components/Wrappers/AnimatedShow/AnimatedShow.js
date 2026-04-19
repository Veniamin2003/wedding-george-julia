const DEFAULT_IO_OPTIONS = {
	threshold: 0.12,
	rootMargin: "0px 0px -7% 0px",
};

/**
 * Появление блоков при скролле. Класс `isVisible` синхронизуется с видимостью
 * во вьюпорте — при уходе блока за экран анимация сбрасывается и сработает снова.
 */
export function animatedShow(userOptions = {}) {
	const options = { ...DEFAULT_IO_OPTIONS, ...userOptions };
	const els = document.querySelectorAll(".js-animatedShow");

	if (!els.length) {
		return;
	}

	if (typeof IntersectionObserver === "undefined") {
		els.forEach((el) => el.classList.add("isVisible"));
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			entry.target.classList.toggle("isVisible", entry.isIntersecting);
		}
	}, options);

	els.forEach((el) => observer.observe(el));
}