$(function () {

    const $form =
        $("#pantry-form");

    const $input =
        $("#pantry-input");

    const $list =
        $("#pantry-list");

    const $count =
        $("#pantry-count");

    const $empty =
        $("#pantry-empty");

    const $feedback =
        $("#pantry-feedback");


    function updateState() {

        const itemCount =
            $list
                .children(
                    ".pantry-item"
                )
                .length;


        $count.text(
            itemCount
            +
            (
                itemCount === 1
                    ? " item"
                    : " items"
            )
        );


        $empty.prop(
            "hidden",
            itemCount !== 0
        );

    }


    function showFeedback(
        message,
        type
    ) {

        $feedback
            .stop(
                true,
                true
            )
            .removeClass(
                "success error"
            )
            .addClass(type)
            .text(message)
            .fadeIn(150)
            .delay(900)
            .fadeOut(250);

    }


    function addIngredient(name) {

        const ingredient =
            $.trim(name);


        if (!ingredient) {
            return;
        }


        const $item =
            $("<li>")
                .addClass(
                    "pantry-item"
                );


        $("<span>")
            .text(ingredient)
            .appendTo($item);


        $("<button>")
            .attr(
                "type",
                "button"
            )
            .addClass(
                "pantry-remove"
            )
            .text(
                "Remove"
            )
            .appendTo($item);


        $list.append($item);


        updateState();

    }


    $form.on(
        "submit",
        function (event) {

            event.preventDefault();


            const ingredient =
                $.trim(
                    $input.val()
                );


            if (!ingredient) {

                showFeedback(
                    "Please enter an ingredient.",
                    "error"
                );

                return;
            }


            addIngredient(
                ingredient
            );


            $input
                .val("")
                .trigger("focus");


            showFeedback(
                ingredient
                +
                " added to your pantry.",
                "success"
            );

        }
    );


    $(".quick-add").on(
        "click",
        function () {

            const ingredient =
                $(this)
                    .data(
                        "ingredient"
                    );


            addIngredient(
                ingredient
            );


            showFeedback(
                ingredient
                +
                " added to your pantry.",
                "success"
            );

        }
    );


    $list.on(
        "click",
        ".pantry-remove",
        function () {

            const ingredient =
                $(this)
                    .siblings("span")
                    .text();


            $(this)
                .closest(
                    ".pantry-item"
                )
                .remove();


            updateState();


            showFeedback(
                ingredient
                +
                " removed.",
                "success"
            );

        }
    );


    $(".faq-question").on(
        "click",
        function () {

            const $button =
                $(this);


            const isOpen =
                $button.attr(
                    "aria-expanded"
                ) === "true";


            $button.attr(
                "aria-expanded",
                String(!isOpen)
            );


            $button
                .next(
                    ".faq-answer"
                )
                .stop(
                    true,
                    true
                )
                .slideToggle(220);

        }
    );


    updateState();

});