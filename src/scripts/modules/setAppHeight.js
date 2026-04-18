export const setAppHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--appHeight', `${window.innerHeight}px`);
}