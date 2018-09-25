define(["require", "exports", "./search"], function (require, exports, search) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contains the logic for interacting with the page
     */
    $('document').ready(function () {
        var $advancedOptions = $('#advanced-options');
        var $advancedButton = $('#advanced-button');
        var $moreOptionsDropdown = $('#more-options-dropdown');
        var pageNumber = 1;
        var darkMode = false;
        $advancedOptions.hide();
        $moreOptionsDropdown.hide();
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
        // shows options drop down menu
        $('#more-options-button').on('click', function () {
            $moreOptionsDropdown.fadeToggle(100);
        });
        // shows about modal
        $('#about-option').on('click', function () {
            // hides dropdown menu
            $moreOptionsDropdown.fadeOut(100);
            // TODO: implement modal and display here
            alert('display about');
        });
        // toggle dark mode
        $('#dark-mode-option').on('click', function (event) {
            // hides dropdown menu
            $moreOptionsDropdown.fadeOut(100);
            // TODO: implement dark mode
            if (darkMode) {
                $(event.target).text('Enable Dark Mode');
                darkMode = false;
            }
            else {
                $(event.target).text('Disable Dark Mode');
                darkMode = true;
            }
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