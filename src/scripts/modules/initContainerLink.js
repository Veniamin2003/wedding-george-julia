// Скрипт позволяющий размещать в ссылке другие интерактивные элементы, которые тоже должны отвечать на клик пользователя
export const initContainerLink = () => {
    try {
        $(document).on('click', '.js-container-link', function(e) {
            let link = this;
            if(
                link != e.target &&
                (
                    e.target.tagName == 'A'
                    || e.target.tagName == 'BUTTON'
                    || $(e.target).closest('.js-container-link__interact').length
                    || $(e.target).hasClass('js-container-link__interact')
                )
            ) {
                e.preventDefault();
                return false;
            }

            window.location.href = e.currentTarget.href;
        });
    } catch (error) {
        console.log(error)
    }

}