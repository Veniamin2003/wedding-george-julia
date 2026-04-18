export const notify = () => {
	try {
        // Закрытие по нажатию на кнопку
        (function() {
            let $notify = $('.js-notify');

            $notify.each(function() {
                let $this = $(this),
                    $button = $this.find('.js-notify__close');

                $this.on('click', function() {
                    $this.removeClass('isVisible');
                });
            });
        })();

        let interval1 = null,
			interval2 = null;

		return function(text) {
			if(!text) return;
			if(interval1) clearInterval(interval1);
			if(interval2) clearInterval(interval2);

			let $notify = $('.js-notify'),
				$notifyText = $notify.find('.js-notify__text');

			$notifyText.html(text);
			$notify.addClass('isVisible');
			interval1 = setTimeout(function() {
				$notify.removeClass('isVisible');

				interval2 = setTimeout(function() {
					$notifyText.text('');
				}, 350);
			}, 3000);
		};
	} catch (error) {
		console.log(error)
	}
};