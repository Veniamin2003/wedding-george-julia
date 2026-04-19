// const DEFAULT_IO_OPTIONS = {
// 	threshold: 0.12,
// 	rootMargin: "0px 0px -7% 0px",
// };

// /**
//  * Появление блоков при скролле. Класс `isVisible` синхронизуется с видимостью
//  * во вьюпорте — при уходе блока за экран анимация сбрасывается и сработает снова.
//  */
// export function animatedShow(userOptions = {}) {
// 	const options = { ...DEFAULT_IO_OPTIONS, ...userOptions };
// 	const els = document.querySelectorAll(".js-animatedShow");

// 	if (!els.length) {
// 		return;
// 	}

// 	if (typeof IntersectionObserver === "undefined") {
// 		els.forEach((el) => el.classList.add("isVisible"));
// 		return;
// 	}

// 	const observer = new IntersectionObserver((entries) => {
// 		for (const entry of entries) {
// 			entry.target.classList.toggle("isVisible", entry.isIntersecting);
// 		}
// 	}, options);

// 	els.forEach((el) => observer.observe(el));
// }

const DEFAULT_IO_OPTIONS = {
	root: null,
	rootMargin: "0px 0px -7% 0px",
	threshold: [0, 0.05, 0.2, 1], // массив для отслеживания разных состояний
};

/**
 * Появление блоков при скролле с разными порогами:
 * - SHOW_THRESHOLD — когда показываем
 * - HIDE_THRESHOLD — когда скрываем
 */
export function animatedShow(userOptions = {}) {
	const options = { ...DEFAULT_IO_OPTIONS, ...userOptions };
	const els = document.querySelectorAll(".js-animatedShow");

	if (!els.length) return;

	if (typeof IntersectionObserver === "undefined") {
		els.forEach((el) => el.classList.add("isVisible"));
		return;
	}

	// Пороги (можно настраивать)
	const SHOW_THRESHOLD = 0.2; // элемент считается "вошёл"
	const HIDE_THRESHOLD = 0.03; // элемент считается "вышел"

	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			const el = entry.target;
			const ratio = entry.intersectionRatio;

			// Вход (показываем)
			if (ratio >= SHOW_THRESHOLD) {
				el.classList.add("isVisible");
			}
			// Выход (скрываем)
			else if (ratio <= HIDE_THRESHOLD) {
				el.classList.remove("isVisible");
			}
			// В промежутке ничего не делаем → убирает дергание
		}
	}, options);

	els.forEach((el) => observer.observe(el));
}