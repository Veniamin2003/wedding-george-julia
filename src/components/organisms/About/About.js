import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

export const TimeCounter = () => {
    function getTimeLeft() {
        // Целевая дата в Московском времени (UTC+3)
        const targetDate = new Date(Date.UTC(2026, 5, 20, 0, 0, 0)); // 20 июня 2026 (нумерация месяцев с 0)

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