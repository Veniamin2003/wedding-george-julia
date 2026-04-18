export const closeMobileMenu = () => {
    let $html = $('html'),
        $burger = $('.js-openMobileMenu'),
        $mobileMenu = $('.js-mobile-menu'),
        $overlay = $('.js-overlay-mob-menu');

    $mobileMenu.removeClass('isOpen');
    $overlay.removeClass('isVisible');
    $burger.removeClass('isActive');
    
    setTimeout(() => {
        $html.removeClass('isFixed');
    }, 300);
}

export const mobileMenu = () => {
	try {
        let $html = $('html'),
            $burger = $('.js-openMobileMenu'),
            $mobileMenu = $('.js-mobile-menu'),
            $overlay = $('.js-overlay-mob-menu');

        $burger.on('click', function() {
            $burger.toggleClass('isActive');

            if($burger.hasClass('isActive')) {
                $mobileMenu.addClass('isOpen');
                $overlay.addClass('isVisible');
                $html.addClass('isFixed');
            } else {
                $mobileMenu.removeClass('isOpen');
                $overlay.removeClass('isVisible');
                
                setTimeout(() => {
                    $html.removeClass('isFixed');
                }, 300);
            }
        });

        $overlay.on('click', function() {
            closeMobileMenu();
        });
	} catch (error) {
		console.log(error)
	}
};