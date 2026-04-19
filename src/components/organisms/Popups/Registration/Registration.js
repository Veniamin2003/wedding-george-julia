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
    const errorBox = form.querySelector('.js-popup__error');

    if (!form) return;

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

        /* ---- Telegram ---- */

        const BOT_TOKEN = '7503385274:AAH8Ce4D_J8G3fdJW27rz7gePNN6mWom6ww';
        const CHAT_ID = '-5167630954';

        const message = `📩 Новая анкета гостя:\n\n👤 Имя: ${nameInput.value}\n\n${answers.join(
            '\n\n'
        )}`;

        try {
            const response = await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: message,
                    }),
                }
            );

            if (response.ok) {
                saveSubmitTime();
                hideFormError(errorBox);
                form.reset();

                // сброс отображения инпутов
                form
                    .querySelectorAll('.js-question[data-has-input="true"]')
                    .forEach(toggleInputVisibility);

                umGlobal?.togglePopup?.('registration', false, false);
                umGlobal?.togglePopup?.('success', true);

            }
        } catch (error) {
            console.error('Telegram error:', error);
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
