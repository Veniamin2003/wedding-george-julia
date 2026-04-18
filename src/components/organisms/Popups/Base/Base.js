export const togglePopup = (name, message) => {
	try {
        let $overlay = $('.js-overlay');
        let $overlayTr = $('.js-overlay-transparent');

        $(document).on('click', '.js-popup__close', function() {
            let $closeBtn = $(this),
                $popup = $closeBtn.closest('.js-popup');

            togglePopup($popup.attr('data-popup-id'), false);
        });

        $(document).on('click', '.js-overlay', function() {
            $('.js-popup').each(function() {
                let $popup = $(this);

                if($popup.hasClass('isVisible')) togglePopup($popup.attr('data-popup-id'), false);
            });
        });

        $overlayTr.on('click', function() {
            $overlayTr.removeClass('isVisible')
        });

        function togglePopup(popupId, status = true, closeOverlay = true) {
            let $popup = $(`.js-popup[data-popup-id="${popupId}"]`);

            if(status) {
                $('html').addClass('isFixed');
                
                $popup.addClass('isVisible');
                if(closeOverlay) $overlay.addClass('isVisible');
            } else {
                $popup.removeClass('isVisible');

                if($popup.find('video').length) $popup.find('video')[0].pause();

                if($popup.find('iframe').length) {
                    let iframe = $popup.find('iframe')[0];

                    iframe.contentWindow.postMessage(JSON.stringify({
                        type: 'player:pause',
                        data: {}
                    }), '*');
                }

                if(closeOverlay) {
                    $overlay.removeClass('isVisible');

                    setTimeout(function() {
                        $('html').removeClass('isFixed');
                    }, 300);
                }
            }
        }

        return togglePopup;
	} catch (error) {
		console.log(error)
	}
};