$(function () {

    const recipeIngredients = {

        "Fluffy Pancakes": [
            "flour",
            "milk",
            "eggs",
            "banana"
        ],

        "Avocado Toast": [
            "bread",
            "avocado",
            "eggs",
            "lemon"
        ],

        "Berry Yogurt Parfait": [
            "yogurt",
            "berries",
            "granola",
            "honey"
        ],

        "Fresh Garden Salad": [
            "lettuce",
            "tomatoes",
            "cucumber",
            "olive oil"
        ],

        "Vegetable Fried Rice": [
            "rice",
            "carrot",
            "peas",
            "eggs",
            "soy sauce"
        ],

        "Creamy Mushroom Pasta": [
            "pasta",
            "mushrooms",
            "cream",
            "garlic",
            "parmesan"
        ],

        "Baked Salmon": [
            "salmon",
            "lemon",
            "olive oil",
            "garlic"
        ],

        "Homemade Cookies": [
            "flour",
            "butter",
            "sugar",
            "eggs",
            "chocolate"
        ],

        "": []
    };


    const defaultPlan = [

        [
            "Avocado Toast",
            "Fresh Garden Salad",
            "Creamy Mushroom Pasta"
        ],

        [
            "Fluffy Pancakes",
            "Vegetable Fried Rice",
            "Baked Salmon"
        ],

        [
            "Berry Yogurt Parfait",
            "Fresh Garden Salad",
            "Creamy Mushroom Pasta"
        ],

        [
            "Avocado Toast",
            "Vegetable Fried Rice",
            "Baked Salmon"
        ],

        [
            "Fluffy Pancakes",
            "Fresh Garden Salad",
            "Creamy Mushroom Pasta"
        ],

        [
            "Berry Yogurt Parfait",
            "Vegetable Fried Rice",
            "Baked Salmon"
        ],

        [
            "Avocado Toast",
            "Fresh Garden Salad",
            "Homemade Cookies"
        ]

    ];


    function updatePlannerSummary() {

        const selectedMeals =
            $(".meal-select")
                .filter(function () {

                    return (
                        $(this).val() !== ""
                    );

                })
                .length;


        $("#planner-summary").text(
            selectedMeals +
            " of 21 meals planned"
        );

    }


    function updateShoppingList() {

        const ingredients =
            new Set();


        $(".meal-select").each(
            function () {

                const recipe =
                    $(this).val();


                const recipeList =
                    recipeIngredients[recipe]
                    || [];


                recipeList.forEach(
                    function (ingredient) {

                        ingredients.add(
                            ingredient
                        );

                    }
                );

            }
        );


        const sortedIngredients =
            Array.from(
                ingredients
            ).sort();


        const $list =
            $("#shopping-list");


        $list.empty();


        if (
            sortedIngredients.length === 0
        ) {

            $("#shopping-empty")
                .prop(
                    "hidden",
                    false
                );

        } else {

            $("#shopping-empty")
                .prop(
                    "hidden",
                    true
                );


            sortedIngredients.forEach(
                function (ingredient) {

                    $("<li>")
                        .text(ingredient)
                        .appendTo($list);

                }
            );

        }


        $("#shopping-count").text(
            sortedIngredients.length +
            " ingredients"
        );


        updatePlannerSummary();

    }


    function applyDefaultPlan() {

        $(".planner-day").each(
            function (dayIndex) {

                $(this)
                    .find(".meal-select")
                    .each(
                        function (mealIndex) {

                            $(this).val(
                                defaultPlan[
                                    dayIndex
                                ][
                                    mealIndex
                                ]
                            );

                        }
                    );

            }
        );


        updateShoppingList();

    }


    $(".meal-select").on(
        "change",
        updateShoppingList
    );


    $(".clear-day").on(
        "click",
        function () {

            $(this)
                .closest(".planner-day")
                .find(".meal-select")
                .val("");


            updateShoppingList();

        }
    );


    $("#clear-week").on(
        "click",
        function () {

            $(".meal-select")
                .val("");


            updateShoppingList();

        }
    );


    $("#reset-week").on(
        "click",
        applyDefaultPlan
    );


    applyDefaultPlan();

});