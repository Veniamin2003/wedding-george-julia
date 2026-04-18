export const Registration = () => {
    // Функция для переключения видимости инпутов
    const toggleInputVisibility = (question) => {
        const inputContainer = question.querySelector('.js-question__input');
        const inputField = inputContainer?.querySelector('input');
        const yesRadio = question.querySelector('input[value="да"]');

        if (inputContainer && inputField && yesRadio) {
            if (yesRadio.checked) {
                inputContainer.classList.add('isActive');
            } else {
                inputContainer.classList.remove('isActive');
                inputField.value = "";
            }
        }
    };

    // Инициализация переключения инпутов
    document.querySelectorAll('.js-question[data-has-input="true"]').forEach(question => {
        const radios = question.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => toggleInputVisibility(question));
        });
        // Инициализируем начальное состояние
        toggleInputVisibility(question);
    });

    // Обработчик отправки формы
    document.querySelector(".js-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Валидация имени
        const nameInput = document.querySelector(".js-input__name input");
        const nameInputWrapper = document.querySelector(".js-input__name .js-input");
        const nameError = document.querySelector(".js-input__name .js-input__error");

        nameInputWrapper.classList.remove("isError");
        nameError.textContent = "Текст ошибки";

        if (!nameInput.value.trim()) {
            nameError.textContent = "Пожалуйста, введите ваше имя";
            nameInputWrapper.classList.add("isError");
            return;
        }

        const answers = [];
        let hasValidationError = false;

        // Собираем ответы
        document.querySelectorAll(".js-question").forEach((question, index) => {
            const checkedInput = question.querySelector("input:checked");
            const questionText = question.querySelector(".js-question__text").innerText;
            const hasInput = question.dataset.hasInput === "true";

            if (!checkedInput) {
                // Обработка невыбранных ответов
                answers.push(`${index + 1}. ${questionText}\nОтвет - Не выбрано`);
                return;
            }

            const answer = checkedInput.value;

            if (hasInput && answer === "да") {
                const inputContainer = question.querySelector('.js-question__input');
                const inputField = inputContainer?.querySelector('input');
                const inputWrapper = inputContainer?.querySelector('.js-input');
                const inputError = inputContainer?.querySelector('.js-input__error');

                // Валидация поля ввода
                if (!inputField?.value.trim()) {
                    inputError.textContent = "Пожалуйста, введите кол-во детей";
                    inputWrapper.classList.add("isError");
                    hasValidationError = true;
                    return;
                }

                answers.push(`${index + 1}. ${questionText}\nОтвет - ${answer}\nКол-во детей: ${inputField.value}`);
            } else {
                answers.push(`${index + 1}. ${questionText}\nОтвет - ${answer}`);
            }
        });

        if (hasValidationError) return;

        // Отправка данных в Telegram
        const botToken = "7503385274:AAH8Ce4D_J8G3fdJW27rz7gePNN6mWom6ww";
        const chatId = "-4949227105";
        const name = nameInput.value;

        const message = `📩 Новая анкета гостя:\n\n👤 Имя: ${name}\n\n\n${answers.join("\n\n")}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: "Markdown",
                }),
            });

            if (response.ok) {
                umGlobal.togglePopup("success");
                document.querySelector(".o-registration").reset();

                // Сбрасываем видимость инпутов
                document.querySelectorAll('.js-question[data-has-input="true"]').forEach(toggleInputVisibility);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    });
};

// Упрощаем остальные функции
export const InputHide = () => {
    document.querySelectorAll('.js-question[data-has-input="true"]').forEach(question => {
        const radios = question.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                const inputContainer = question.querySelector('.js-question__input');
                const inputField = inputContainer?.querySelector('input');
                const yesRadio = question.querySelector('input[value="да"]');

                if (yesRadio?.checked) {
                    inputContainer.classList.add('isActive');
                } else {
                    inputContainer.classList.remove('isActive');
                    inputField.value = "";
                }
            });
        });
    });
};

export const InputMasks = () => {
    // Ограничение на ввод только букв для имени
    document.querySelector(".js-input__name input")?.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
    });

    // Ограничение на ввод только чисел для всех числовых полей
    document.querySelectorAll('.js-question__input input').forEach(input => {
        input.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "");
        });
    });
};