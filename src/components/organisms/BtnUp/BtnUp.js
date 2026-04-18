export const btnUp = () => {
    try {
        const btn = $(".js-btnUp");
        $(window).scroll(function () {
            if ($(window).scrollTop() > 300) {
                btn.addClass("isVisible");
            } else {
                btn.removeClass("isVisible");
            }
        });

        btn.on("click", function (e) {
            e.preventDefault();
            $("html, body").animate({
                    scrollTop: 0,
                },
                "300"
            );
        });
    } catch (error) {
        console.log(error)
    }

}