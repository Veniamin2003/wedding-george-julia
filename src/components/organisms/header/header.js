export const header = () => {
	try {
		const header = document.querySelector('.js-header');
		const megaMenu = document.querySelectorAll('.js-megaMenu');

		window.addEventListener('scroll', scrollHandler)

		function scrollHandler () {
			const headerCompact = () => header.classList.contains('isCompact')

			if(window.pageYOffset <= 100) {
				if(headerCompact()) header.classList.remove('isCompact');

				megaMenu.forEach((item) => {
					item.classList.remove('isScrolled')
				})
			} else {
				if(!headerCompact()) header.classList.add('isCompact');

				megaMenu.forEach((item) => {
					item.classList.add('isScrolled')
				})
			}
		}

		scrollHandler();
	} catch (error) {
	  	console.log(error)
	}
};