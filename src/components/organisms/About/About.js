import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

export const TimeCounter = () => {
    function getTimeLeft() {
        // Целевая дата в Московском времени (UTC+3)
        const targetDate = new Date(Date.UTC(2025, 9, 4, 0, 0, 0)); // Октябрь - 4 (нумерация месяцев с 0)

        // Получаем текущее время в Московском часовом поясе
        const now = new Date();
        const nowUTC3 = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));

        const difference = targetDate - nowUTC3;
        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0 };
        }

        const totalMinutes = Math.floor(difference / (1000 * 60));
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        return {
            days: totalDays, // Полные дни
            hours: totalHours % 24, // Остаток часов в пределах суток
            minutes: totalMinutes % 60 // Остаток минут в пределах часа
        };
    }

    function getDeclension(number, one, few, many) {
        if (number % 10 === 1 && number % 100 !== 11) {
            return one;
        } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
            return few;
        } else {
            return many;
        }
    }

    // Функция для обновления DOM
    function updateCountdown() {
        const countdown = getTimeLeft();

        // Обновляем цифры
        document.querySelector(".js-about-time__day").textContent = countdown.days;
        document.querySelector(".js-about-time__hour").textContent = countdown.hours;
        document.querySelector(".js-about-time__minute").textContent = countdown.minutes;

        // Обновляем подписи (день/дня/дней, час/часа/часов, минута/минуты/минут)
        document.querySelector(".js-about-label__day").textContent = getDeclension(countdown.days, "день", "дня", "дней");
        document.querySelector(".js-about-label__hour").textContent = getDeclension(countdown.hours, "час", "часа", "часов");
        document.querySelector(".js-about-label__minute").textContent = getDeclension(countdown.minutes, "минута", "минуты", "минут");
    }

    // Запускаем таймер
    updateCountdown(); // Чтобы значения сразу обновились при загрузке
    setInterval(updateCountdown, 60000); // Обновление каждую минуту (без секунд)
};

export const AnimationHands = () => {

    // Регистрация плагина ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const leftHand = document.querySelector(".js-left-hand");
    const rightHand = document.querySelector(".js-right-hand");

    if (leftHand && rightHand) {

        gsap.fromTo(leftHand,
                { x: 0, y: 0 },   // Начальная позиция (по умолчанию)
                {
                    x: 20,        // Движение вправо
                    y: -10,       // Движение вверх
                    scale: 1.1,
                    rotate: 6,
                    scrollTrigger: {
                        trigger: ".js-wrapper", // Элемент, который запускает анимацию
                        start: "bottom bottom", // Начало анимации при попадании .js-wrapper в зону видимости
                        end: "bottom center", // Конец анимации, когда .container полностью прокручивается
                        scrub: true // Плавная привязка к прокрутке
                    }
                }
        );

        gsap.fromTo(rightHand,
                { x: 0, y: 0 },   // Начальная позиция (по умолчанию)
                {
                    x: -15,        // Движение влево
                    y: 20,       // Движение вниз
                    scale: 1.1,
                    rotate: -6,
                    scrollTrigger: {
                        trigger: ".js-wrapper",
                        start: "bottom bottom",
                        end: "bottom center",
                        scrub: true
                    }
                }
        );

        // gsap.to(leftHand, {
        //     // y: 3,
        //     // x: 3,
        //     rotation: 3, // Лёгкое покачивание
        //     repeat: -1,  // Бесконечное повторение
        //     yoyo: true,  // Анимация идёт туда-обратно
        //     duration: 3
        // });
        //
        // gsap.to(rightHand, {
        //     // y: 3,
        //     // x: -3,
        //     rotation: -3,
        //     repeat: -1,
        //     yoyo: true,
        //     duration: 3
        // });

        gsap.to(".js-background", {
            y: -4, // Движение фона вверх (медленно)
            scrollTrigger: {
                trigger: ".js-wrapper",
                start: "bottom bottom",
                end: "bottom center",
                scrub: 1 // Плавность
            }
        });
    }
}
