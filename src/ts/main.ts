/**
 * Contains the logic for interacting with the page
 */

$('document').ready(() => {
    const $advancedOptions: JQuery<HTMLElement> = $('#advanced-options');
    const $advancedButton: JQuery<HTMLElement> = $('#advanced-button');

    let pageNumber: number = 1;

    $advancedOptions.hide();

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
        getSearchResults(pageNumber.toString());
    });

    // auto scroll
    $(window).scroll(() => {
        // add 1 to handle rounding errors
        const pagePosition: number =
            ($(window).scrollTop() as number) + ($(window).height() as number) + 1;

        if (pagePosition >= ($(document).height() as number)) {
            $advancedOptions.slideUp(200);
            pageNumber += 1;
            getSearchResults(pageNumber.toString());
        }
    });
});
