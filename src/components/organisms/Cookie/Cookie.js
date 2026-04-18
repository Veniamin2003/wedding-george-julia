export const cookie = () => {
    try {
        const cookieCloseBtn = document.querySelectorAll('.js-cookie__close');
        const cookie = document.querySelector('.js-cookie')
        const checkCookie = getCookie('o-cookie-accept');

        if (checkCookie != 'true') {
            setTimeout(() => {
                $(cookie).addClass('isVisible');
            }, 3000);
        }

        cookieCloseBtn.forEach(el => {
            el.addEventListener('click', () => {
                $(cookie).removeClass('isVisible');
                setCookie('o-cookie-accept', 'true', {
                    secure: true,
                    expires: (new Date(Date.now() + 2806400e3)).toUTCString()
                });
            })
        })
        // возвращает куки с указанным name, или undefined, если ничего не найдено
        function getCookie(name) {
            let matches = document
                .cookie
                .match(new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                    "=([^;]*)"
                ));

            return matches
                ? decodeURIComponent(matches[1])
                : undefined;
        }

        function setCookie(name, value, options = {}) {
            options = {
                path: '/',
                // при необходимости добавьте другие значения по умолчанию
                ...options
            };

            if (options.expires instanceof Date) {
                options.expires = options
                    .expires
                    .toUTCString();
            }

            let updatedCookie = encodeURIComponent(name) + "=" +
                    encodeURIComponent(value);

            for (let optionKey in options) {
                updatedCookie += "; " + optionKey;
                let optionValue = options[optionKey];
                if (optionValue !== true) {
                    updatedCookie += "=" + optionValue;
                }
            }

            document.cookie = updatedCookie;
        }

    } catch (error) {
        console.log(error)
    }

}