$(function () {
    const STORAGE_KEY = "cookfromhome-theme";

    const $body = $("body");
    const $themeButton = $("#global-theme-toggle");

    function applyTheme(theme) {
        const isDark = theme === "dark";

        $body.toggleClass(
            "dark-theme",
            isDark
        );

        $themeButton.attr(
            "aria-pressed",
            String(isDark)
        );

        $themeButton.text(
            isDark
                ? "☀ Light"
                : "☾ Dark"
        );
    }

    const savedTheme =
        localStorage.getItem(
            STORAGE_KEY
        ) || "light";

    applyTheme(savedTheme);

    $themeButton.on(
        "click",
        function () {
            const nextTheme =
                $body.hasClass("dark-theme")
                    ? "light"
                    : "dark";

            localStorage.setItem(
                STORAGE_KEY,
                nextTheme
            );

            applyTheme(nextTheme);
        }
    );
});