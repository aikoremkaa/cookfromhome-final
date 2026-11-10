$(function () {

    function validEmail(email) {

        return (
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(email)
        );

    }


    function setError(
        selector,
        message
    ) {

        $(selector).text(
            message
        );

    }


    function clearContactErrors() {

        $(
            "#contact-name-error, "
            +
            "#contact-email-error, "
            +
            "#contact-message-error"
        ).text("");


        $("#contact-success")
            .removeClass("show");

    }


    function clearRegisterErrors() {

        $(
            "#register-name-error, "
            +
            "#register-email-error, "
            +
            "#password-error, "
            +
            "#confirm-password-error, "
            +
            "#country-error"
        ).text("");


        $("#register-success")
            .removeClass("show");

    }


    $("#contact-form").on(
        "submit",
        function (event) {

            event.preventDefault();


            clearContactErrors();


            const name =
                $.trim(
                    $("#contact-name")
                        .val()
                );


            const email =
                $.trim(
                    $("#contact-email")
                        .val()
                );


            const message =
                $.trim(
                    $("#contact-message")
                        .val()
                );


            let valid =
                true;


            if (
                name.length < 2
            ) {

                setError(
                    "#contact-name-error",
                    "Please enter at least 2 characters."
                );

                valid =
                    false;

            }


            if (
                !validEmail(email)
            ) {

                setError(
                    "#contact-email-error",
                    "Please enter a valid email address."
                );

                valid =
                    false;

            }


            if (
                message.length < 10
                ||
                message.length > 500
            ) {

                setError(
                    "#contact-message-error",
                    "Message must contain 10–500 characters."
                );

                valid =
                    false;

            }


            if (!valid) {
                return;
            }


            $("#contact-success")
                .addClass(
                    "show"
                );


            this.reset();


            $("#message-count")
                .text(
                    "0 / 500"
                );

        }
    );


    $("#contact-message").on(
        "input",
        function () {

            $("#message-count")
                .text(
                    $(this)
                        .val()
                        .length
                    +
                    " / 500"
                );


            $("#contact-success")
                .removeClass(
                    "show"
                );

        }
    );


    $("#register-form").on(
        "submit",
        function (event) {

            event.preventDefault();


            clearRegisterErrors();


            const name =
                $.trim(
                    $("#register-name")
                        .val()
                );


            const email =
                $.trim(
                    $("#register-email")
                        .val()
                );


            const password =
                $("#password")
                    .val();


            const confirmPassword =
                $("#confirm-password")
                    .val();


            const country =
                $("#country")
                    .val();


            let valid =
                true;


            if (
                name.length < 2
            ) {

                setError(
                    "#register-name-error",
                    "Please enter your full name."
                );

                valid =
                    false;

            }


            if (
                !validEmail(email)
            ) {

                setError(
                    "#register-email-error",
                    "Please enter a valid email address."
                );

                valid =
                    false;

            }


            if (
                password.length < 8
            ) {

                setError(
                    "#password-error",
                    "Password must contain at least 8 characters."
                );

                valid =
                    false;

            }


            if (
                confirmPassword
                !== password
                ||
                confirmPassword
                === ""
            ) {

                setError(
                    "#confirm-password-error",
                    "Passwords do not match."
                );

                valid =
                    false;

            }


            if (!country) {

                setError(
                    "#country-error",
                    "Please select a country."
                );

                valid =
                    false;

            }


            if (!valid) {
                return;
            }


            $("#register-success")
                .addClass(
                    "show"
                );


            this.reset();

        }
    );


    $(
        "#contact-form input, "
        +
        "#register-form input, "
        +
        "#register-form select"
    ).on(
        "input change",
        function () {

            $(
                "#contact-success, "
                +
                "#register-success"
            ).removeClass(
                "show"
            );

        }
    );


    $("#reset-contact").on(
        "click",
        function () {

            clearContactErrors();

            $("#message-count")
                .text(
                    "0 / 500"
                );

        }
    );


    $("#reset-register").on(
        "click",
        clearRegisterErrors
    );

});