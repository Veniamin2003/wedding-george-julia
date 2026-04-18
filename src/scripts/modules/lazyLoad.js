export const lazyLoad = () => {
    try {
        document.querySelectorAll('[data-src]').forEach(item => {
            item.src = item.dataset.src;
        });
    } catch (error) {
        console.error(error)
    }
}