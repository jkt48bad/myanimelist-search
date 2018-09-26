import search = require('./search');

/**
 * Contains the logic for interacting with the page
 */

$('document').ready(() => {
    const $advancedOptions: JQuery<HTMLElement> = $('#advanced-options');
    const $advancedButton: JQuery<HTMLElement> = $('#advanced-button');
    const $moreOptionsDropdown: JQuery<HTMLElement> = $('#more-options-dropdown');
    const $aboutModal: JQuery<HTMLElement> = $('#about-modal');
    const $modalBackground: JQuery<HTMLElement> = $('#modal-background');

    let pageNumber: number = 1;
    const darkMode: boolean = false;

    $advancedOptions.hide();
    $moreOptionsDropdown.hide();
    $aboutModal.hide();
    $modalBackground.hide();

    // toggles advanced options menu display
    $advancedButton.on('click', () => {
        $advancedOptions.slideToggle(200);
    });

    // perform search if enter is pressed while search box is active
    $('#search-box').keypress((event) => {
        const key: number = event.which;
        if (key === 13) {
            $('#search-button').click();
            return false;
        }
    });

    // perform search
    $('#search-button').on('click', () => {
        $advancedOptions.slideUp(200);
        pageNumber = 1;
        $('.result-container').html('');
        search.getSearchResults(pageNumber.toString());
    });

    // shows options drop down menu
    $('#more-options-button').on('click', () => {
        $moreOptionsDropdown.fadeToggle(100);
    });

    // shows about modal
    $('#about-option').on('click', () => {
        // hides dropdown menu
        $moreOptionsDropdown.fadeOut(100);
        // display modal
        $modalBackground.fadeToggle(200);
        $aboutModal.fadeToggle(200);
    });

    $('#close-about-button').on('click', () => {
        $modalBackground.fadeToggle(200);
        $aboutModal.fadeToggle(200);
    });

    // auto scroll
    $(window).scroll(() => {
        // add 1 to handle rounding errors
        const pagePosition: number =
            ($(window).scrollTop() as number) + ($(window).height() as number) + 1;

        if (pagePosition >= ($(document).height() as number)) {
            $advancedOptions.slideUp(200);
            pageNumber += 1;
            search.getSearchResults(pageNumber.toString());
        }
    });
});
