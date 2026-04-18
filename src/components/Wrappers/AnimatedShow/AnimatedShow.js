
function addObserver(el, options) {
    const observer = new IntersectionObserver((entries, observer) => {
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

export const animatedShow = () => {
    const options = {
        rootMargin: "-90px",
        cb: (el) => {
            el.classList.add("isVisible");
        },
    };
    const els = document.querySelectorAll('.js-animatedShow');

    els.forEach((el) => {
        addObserver(el, options);
    });
}