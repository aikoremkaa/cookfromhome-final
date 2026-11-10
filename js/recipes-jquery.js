$(function () {

    const $search =
        $("#recipes-search");

    const $categories =
        $(
            'input[name="meal-filter"]'
        );

    const $cards =
        $(
            ".recipes-grid .recipes-card"
        );

    const $resultCount =
        $("#recipes-results-count");

    const $noResults =
        $("#recipes-no-results");


    function filterRecipes() {

        const query =
            $.trim(
                $search.val()
            ).toLowerCase();


        const category =
            $categories
                .filter(":checked")
                .val()
            ||
            "all";


        let matches =
            0;


        $cards.each(
            function () {

                const $card =
                    $(this);


                const title =
                    $card
                        .find("h3")
                        .text()
                        .toLowerCase();


                const description =
                    $card
                        .find(
                            ".recipes-card-body > p"
                        )
                        .text()
                        .toLowerCase();


                const ingredients =
                    $card
                        .find(
                            ".recipes-details-body ul"
                        )
                        .text()
                        .toLowerCase();


                const cardCategory =
                    $card.attr(
                        "data-category"
                    );


                const matchesText =
                    (
                        title
                        +
                        " "
                        +
                        description
                        +
                        " "
                        +
                        ingredients
                    )
                    .includes(
                        query
                    );


                const matchesCategory =
                    category === "all"
                    ||
                    cardCategory
                    === category;


                const visible =
                    matchesText
                    &&
                    matchesCategory;


                $card.toggle(
                    visible
                );


                if (visible) {
                    matches++;
                }

            }
        );


        $resultCount.text(
            "Showing "
            +
            matches
            +
            " of "
            +
            $cards.length
            +
            " recipes"
        );


        $noResults.prop(
            "hidden",
            matches !== 0
        );

    }


    $search.on(
        "input",
        filterRecipes
    );


    $categories.on(
        "change",
        filterRecipes
    );


    $("#recipes-clear-filters").on(
        "click",
        function () {

            $search.val("");

            $("#recipes-all")
                .prop(
                    "checked",
                    true
                );


            filterRecipes();


            $search.trigger(
                "focus"
            );

        }
    );


    filterRecipes();

});