$(function () {

    const $cards =
        $(".tip-card-final");

    const $filters =
        $(".tip-filter");

    let activeCategory =
        "all";


    function applyFilter() {

        let visibleCount =
            0;


        $cards.each(
            function () {

                const $card =
                    $(this);


                const matches =
                    activeCategory === "all"
                    ||
                    $card.data("category")
                    === activeCategory;


                $card.toggle(
                    matches
                );


                if (matches) {
                    visibleCount++;
                }

            }
        );


        $("#tips-count").text(
            visibleCount +
            " tips shown"
        );


        $("#tips-empty").prop(
            "hidden",
            visibleCount !== 0
        );

    }


    $filters.on(
        "click",
        function () {

            activeCategory =
                $(this)
                    .data("category");


            $filters
                .removeClass("active")
                .attr(
                    "aria-pressed",
                    "false"
                );


            $(this)
                .addClass("active")
                .attr(
                    "aria-pressed",
                    "true"
                );


            applyFilter();

        }
    );


    $(".tip-more").on(
        "click",
        function () {

            const $button =
                $(this);


            const $details =
                $button
                    .closest(
                        ".tip-card-final"
                    )
                    .find(
                        ".tip-details"
                    );


            const isOpen =
                $button.attr(
                    "aria-expanded"
                ) === "true";


            $button.attr(
                "aria-expanded",
                String(!isOpen)
            );


            $button.text(
                isOpen
                    ? "Why this helps"
                    : "Hide explanation"
            );


            $details
                .stop(
                    true,
                    true
                )
                .slideToggle(200);

        }
    );


    $("#random-tip").on(
        "click",
        function () {

            const $visibleCards =
                $cards.filter(
                    ":visible"
                );


            if (
                $visibleCards.length
                === 0
            ) {
                return;
            }


            const randomIndex =
                Math.floor(
                    Math.random()
                    *
                    $visibleCards.length
                );


            const $chosen =
                $visibleCards.eq(
                    randomIndex
                );


            $cards.removeClass(
                "tip-highlight"
            );


            $chosen.addClass(
                "tip-highlight"
            );


            $("html, body")
                .animate(
                    {
                        scrollTop:
                            $chosen
                                .offset()
                                .top
                            - 120
                    },
                    350
                );


            $chosen
                .hide()
                .fadeIn(300);


            $("#random-tip-result")
                .text(
                    "Try this one: "
                    +
                    $chosen
                        .find("h2")
                        .text()
                );

        }
    );


    applyFilter();

});