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
            // display modal
            var $aboutModal = $($('#template-about').html());
            var $backgroundModal = $($('#template-modal-background').html());
            $('body').append($backgroundModal.fadeTo(0, 0.01));
            $('body').append($aboutModal.fadeTo(0, 0.01));
            $('#modal-background').fadeTo(100, 1);
            $('#about-modal').fadeTo(100, 1);
            $('#close-about-button').on('click', function () {
                $('#modal-background').fadeTo(100, 0.01);
                $('#about-modal').fadeTo(100, 0.01);
                $('#modal-background')
                    .delay(200)
                    .remove();
                $('#about-modal')
                    .delay(200)
                    .remove();
            });
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