import IMask from 'imask';

export const showFieldError = (name, message) => {
	try {
        let $input = $(`input[name="${name}"], textarea[name="${name}"]`),
            $inputBlock = $input.closest('.js-input'),
            $error = $inputBlock.find('.js-input__error');

        $inputBlock.addClass('isError');

        if($error.length == 0) $inputBlock.append($(`<div class="a-input__error js-input__error">${message}</div>`));
        else $error.text(message);
	} catch (error) {
		console.log(error)
	}
};

export const toggleLabelPosition = () => {
	try {
        let $items = $('.js-input');

        $items.each(function() {
            let $this = $(this),
                $input = $this.find('.js-input__input, textarea');

            ['keypress.checkempty', 'input.checkempty'].forEach(event => {
                $input.off(event);
            });
            ['keypress.checkerror', 'input.checkerror'].forEach(event => {
                $input.off(event);
            });

            $input.on('focus.checkempty', function() {
                $this.removeClass('isEmpty');
            });
            $input.on('blur.checkempty', function() {
                if($input.val() == '') $this.addClass('isEmpty');
            });

            ['keypress.checkempty', 'input.checkempty'].forEach(event => {
                $input.on(event, function() {
                    $this.removeClass('isEmpty');
                });
            });
            
            ['keypress.checkerror', 'input.checkerror'].forEach(event => {
                $input.on(event, function() {
                    if($this.hasClass('isError')) $this.removeClass('isError')
                });
            });
            
            if($input.val() == '') $this.addClass('isEmpty');
            else $this.removeClass('isEmpty');
        });
	} catch (error) {
		console.log(error)
	}
};

export const inputMasks = () => {
	try {
        $(".js-mask-phone input, input.js-mask-phone").each(function() {
            const mask = IMask(this, {
                mask: '+{7}(000)000-00-00'
            });
        });
	} catch (error) {
		console.log(error)
	}
};