"use strict";
$('document').ready(function () {
    $('#advanced-options').hide();
    // toggles advanced options menu display
    $('#advanced-button').on('click', function () {
        $('#advanced-options').slideToggle({
            duration: 200,
            easing: 'swing',
        });
    });
});
//# sourceMappingURL=main.js.map