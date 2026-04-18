export const scrollToTop = (selector) => {
    try {
        // Скролл к элементу
        let $elementToScroll = $(selector);
        let offset = window.innerWidth < 768 ? 95 : 200; // Условие для мобильной версии

        $([document.documentElement, document.body]).animate({
            scrollTop: $elementToScroll.offset().top - offset
        }, 800);
    } catch (error) {
        console.log(error);
    }
};
