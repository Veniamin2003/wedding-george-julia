/**
 * ============================
 * Registration form logic
 * ============================
 */

/* --------------------------------
   Helpers
-------------------------------- */

const toggleInputVisibility = (question) => {
    const inputContainer = question.querySelector('.js-question__input');
    const inputField = inputContainer?.querySelector('input, textarea');

    if (!inputContainer || !inputField) return;

    // Показываем инпут, если выбран radio с классом js-question__children
    const activeRadio = question.querySelector(
        'input[type="radio"].js-question__children:checked'
    );

    if (activeRadio) {
        inputContainer.classList.add('isActive');
    } else {
        inputContainer.classList.remove('isActive');
        inputField.value = '';
    }
};

/* --------------------------------
   Anti-spam (client-side)
-------------------------------- */

const SUBMIT_TIMEOUT = 60_000; // 1 минута
const REQUEST_TIMEOUT_MS = 60_000; // ожидание ответа сервера
const STORAGE_KEY = 'registration_last_submit';

const canSubmit = () => {
    const lastSubmit = localStorage.getItem(STORAGE_KEY);
    return !lastSubmit || Date.now() - Number(lastSubmit) > SUBMIT_TIMEOUT;
};

const saveSubmitTime = () => {
    localStorage.setItem(STORAGE_KEY, Date.now());
};

const showFormError = (errorBox, message) => {
    if (!errorBox) return;

    errorBox.textContent = message;
    errorBox.classList.add('isVisible');
};

const hideFormError = (errorBox) => {
    if (!errorBox) return;

    errorBox.textContent = '';
    errorBox.classList.remove('isVisible');
};

/* --------------------------------
   Main registration logic
-------------------------------- */

export const Registration = () => {
    const form = document.querySelector('.js-form');
    if (!form) return;

    const errorBox = form.querySelector('.js-popup__error');
    const loaderEl = form.querySelector('.js-registration-loader');
    const submitBtn = form.querySelector('.js-registration-submit');

    let isSubmitting = false;

    const setLoading = (loading) => {
        loaderEl?.classList.toggle('isVisible', loading);
        loaderEl?.setAttribute('aria-hidden', loading ? 'false' : 'true');
        if (submitBtn) submitBtn.disabled = loading;
        form.setAttribute('aria-busy', loading ? 'true' : 'false');
    };

    /* ---------- Init questions ---------- */

    form.querySelectorAll('.js-question[data-has-input="true"]').forEach(question => {
        question.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', () => toggleInputVisibility(question));
        });

        // начальное состояние
        toggleInputVisibility(question);
    });

    form.addEventListener('input', () => {
        hideFormError(errorBox);
    });
    /* ---------- Submit ---------- */

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        // Антиспам: таймаут между отправками
        if (!canSubmit()) {
            showFormError(
                errorBox,
                'Вы уже отправляли анкету. Пожалуйста, попробуйте чуть позже 🙏'
            );
            return;
        }

        /* ---- Name validation ---- */

        const nameInput = form.querySelector('.js-input__name input');
        const nameWrapper = form.querySelector('.js-input__name .js-input');
        const nameError = form.querySelector('.js-input__name .js-input__error');

        nameWrapper?.classList.remove('isError');

        if (!nameInput?.value.trim()) {
            nameError.textContent = 'Пожалуйста, введите имя';
            nameWrapper.classList.add('isError');
            return;
        }

        /* ---- Collect answers ---- */

        const answers = [];
        let hasValidationError = false;

        form.querySelectorAll('.js-question').forEach((question, index) => {
            const questionText =
                question.querySelector('.js-question__text')?.innerText ||
                `Вопрос ${index + 1}`;

            const checkedRadio = question.querySelector('input[type="radio"]:checked');

            if (!checkedRadio) {
                answers.push(
                    `${index + 1}. ${questionText}\nОтвет: не выбран`
                );
                return;
            }

            let answerText = `${index + 1}. ${questionText}\nОтвет: ${checkedRadio.parentElement.innerText.trim()}`;

            /* ---- Extra input validation ---- */

            if (
                question.dataset.hasInput === 'true' &&
                checkedRadio.classList.contains('js-question__children')
            ) {
                const inputContainer = question.querySelector('.js-question__input');
                const inputField = inputContainer?.querySelector('input, textarea');
                const inputWrapper = inputContainer?.querySelector('.js-input');
                const inputError = inputContainer?.querySelector('.js-input__error');

                inputWrapper?.classList.remove('isError');

                if (!inputField?.value.trim()) {
                    inputError.textContent =
                        inputField.dataset.error || 'Заполните поле';
                    inputWrapper?.classList.add('isError');
                    hasValidationError = true;
                    return;
                }

                answerText += `\nКомментарий: ${inputField.value}`;
            }

            answers.push(answerText);
        });

        if (hasValidationError) return;

        const message = `📩 Новая анкета гостя:\n\n👤 Имя: ${nameInput.value}\n\n${answers.join(
            '\n\n'
        )}`;

        isSubmitting = true;
        setLoading(true);
        hideFormError(errorBox);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch('/send-to-telegram.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message }),
                signal: controller.signal,
            });

            let result = {};
            try {
                const text = await response.text();
                if (text) result = JSON.parse(text);
            } catch {
                result = {};
            }

            if (response.ok && result.success) {
                saveSubmitTime();
                hideFormError(errorBox);
                form.reset();

                form
                    .querySelectorAll('.js-question[data-has-input="true"]')
                    .forEach(toggleInputVisibility);

                umGlobal?.togglePopup?.('registration', false, false);
                umGlobal?.togglePopup?.('success', true);
            } else {
                let errMsg =
                    typeof result.error === 'string' && result.error.trim()
                        ? result.error
                        : '';

                if (!errMsg) {
                    if (response.status === 404) {
                        errMsg =
                            'Сервис отправки не найден (404). Пожалуйста, попробуйте позже или напишите нам напрямую 🙏';
                    } else if (!response.ok) {
                        errMsg = `Ошибка сервера (${response.status}). Пожалуйста, попробуйте позже или свяжитесь с нами напрямую 🙏`;
                    } else {
                        errMsg =
                            'Ошибка отправки. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую 🙏';
                    }
                }

                showFormError(errorBox, errMsg);
            }
        } catch (error) {
            console.error('Send error:', error);

            if (error.name === 'AbortError') {
                showFormError(
                    errorBox,
                    'Запрос занял слишком много времени. Проверьте соединение и попробуйте снова 🙏'
                );
            } else if (error instanceof TypeError) {
                showFormError(
                    errorBox,
                    'Не удалось связаться с сервером. Проверьте интернет и попробуйте снова 🙏'
                );
            } else {
                showFormError(
                    errorBox,
                    'Ошибка отправки. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую 🙏'
                );
            }
        } finally {
            clearTimeout(timeoutId);
            isSubmitting = false;
            setLoading(false);
        }
    });
};


/* --------------------------------
   Input masks
-------------------------------- */

export const InputMasks = () => {
    // Имя — только буквы
    document
        .querySelector('.js-input__name input')
        ?.addEventListener('input', function () {
            this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
        });

    // Все доп. инпуты — цифры (если нужно)
    document.querySelectorAll('.js-question__input input[data-only-number]')
        .forEach(input => {
            input.addEventListener('input', function () {
                this.value = this.value.replace(/\D/g, '');
            });
        });
};
