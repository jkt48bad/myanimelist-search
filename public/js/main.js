define(["require", "exports", "./search"], function (require, exports, search) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contains the logic for interacting with the page
     */
    $('document').ready(function () {
        var $advancedOptions = $('#advanced-options');
        var $advancedButton = $('#advanced-button');
        var pageNumber = 1;
        $advancedOptions.hide();
        // toggles advanced options menu display
        $advancedButton.on('click', function () {
            $advancedOptions.slideToggle(200);
        });
        // perform search if enter is pressed while search box is active
        $('#search-box').keypress(function (event) {
            var key = event.which;
            if (key === 13) {
                $('#search-button').click();
                return false;
            }
        });
        // perform search
        $('#search-button').on('click', function () {
            $advancedOptions.slideUp(200);
            pageNumber = 1;
            $('.result-container').html('');
            search.getSearchResults(pageNumber.toString());
        });
        // auto scroll
        $(window).scroll(function () {
            // add 1 to handle rounding errors
            var pagePosition = $(window).scrollTop() + $(window).height() + 1;
            if (pagePosition >= $(document).height()) {
                $advancedOptions.slideUp(200);
                pageNumber += 1;
                search.getSearchResults(pageNumber.toString());
            }
        });
    });
});
//# sourceMappingURL=main.js.map