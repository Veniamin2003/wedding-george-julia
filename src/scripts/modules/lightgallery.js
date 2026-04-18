import lightGallery from 'lightgallery';

export const lightgallery = () => {
    try {
        window.umGlobal = window.umGlobal || {};

        let items = document.querySelectorAll('.js-lightgallery'),
            plugins = [];

        items.forEach(item => {
            if(item.dataset.galleryInit == 'true') return;

            plugins.push(lightGallery(item, {
                selector: '.js-lightgallery__item'
            }));

            item.dataset.galleryInit = true;
        });

        umGlobal.refreshLightGallery = () => {
            plugins.forEach(plugin => {
                plugin.refresh()
            })
        }
    } catch (error) {
        console.log(error)
    }

}