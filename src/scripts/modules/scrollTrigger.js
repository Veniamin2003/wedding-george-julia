
export function scrollTrigger(selector = ".js-animatedBlock", options = {}) {
    let defaultOptions = {
        rootMargin: "-90px",
        cb: (el) => {
            el.classList.add("isShowed");
        },
    };

    options = {...defaultOptions, ...options};

    let els = document.querySelectorAll(selector);
    els = Array.from(els);
    els.forEach((el) => {
        addObserver(el, options);
    });
}

function addObserver(el, options) {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (options.cb) {
                    options.cb(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, options);
    observer.observe(el);
}