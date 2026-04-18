import { inputMasks, showFieldError, toggleLabelPosition } from "../components/Atoms/Fields/Input/Input.js";
import { togglePopup } from "../components/Organisms/Popups/Base/Base.js";
import { initContainerLink } from "./modules/initContainerLink.js";
import { lazyLoad } from "./modules/lazyLoad.js";
import { lightgallery } from "./modules/lightgallery.js";
import { runScriptOnUserEvent } from "./modules/runScriptOnUserEvent.js";
import { scrollToTop } from "./modules/scrollToTop.js";
import { setAppHeight } from "./modules/setAppHeight.js";
import { urlGenerator } from "./modules/urlGenerator.js";
import {InputHide, InputMasks, Registration} from "../components/organisms/Registration/Registration.js";
import {AnimationHands, TimeCounter} from "../components/organisms/About/About.js";

document.addEventListener("DOMContentLoaded", function () {
	try {
		// Глобальный объект для доступа к функциям извне
		window.umGlobal = window.umGlobal || {};

		// Атомы
		umGlobal.showFieldError = showFieldError
		umGlobal.toggleLabelPosition = toggleLabelPosition;
		umGlobal.inputMasks = inputMasks;

		toggleLabelPosition();
		inputMasks();

		// Организмы
		umGlobal.togglePopup = togglePopup();

		Registration();
		InputHide();
		InputMasks();
		TimeCounter();
		AnimationHands();

		// Всякое полезное, описание функций внутри модулей
		umGlobal.initContainerLink = initContainerLink;
		umGlobal.lightgallery = lightgallery;
		umGlobal.runScriptOnUserEvent = runScriptOnUserEvent;
		umGlobal.scrollToTop = scrollToTop;
		umGlobal.urlGenerator = urlGenerator;

		initContainerLink();
		lightgallery();
	} catch (error) {
		console.error(error);
	}
});

window.addEventListener('load', function() {
	try {
		// Глобальный объект для доступа к функциям извне
		window.umGlobal = window.umGlobal || {};

		// Всякое полезное, описание функций внутри модулей
		umGlobal.lazyLoad = lazyLoad;

		setAppHeight();
		lazyLoad();
	} catch (error) {
		console.error(error);
	}
});
