import search = require('./search');

/**
 * Contains the logic for interacting with the page
 */

$('document').ready(() => {
    const $advancedOptions: JQuery<HTMLElement> = $('#advanced-options');
    const $advancedButton: JQuery<HTMLElement> = $('#advanced-button');
    const $moreOptionsDropdown: JQuery<HTMLElement> = $('#more-options-dropdown');

    let pageNumber: number = 1;
    const darkMode: boolean = false;

    $advancedOptions.hide();
    $moreOptionsDropdown.hide();

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
        const $aboutModal: JQuery<HTMLElement> = $($('#template-about').html());
        const $backgroundModal: JQuery<HTMLElement> = $($('#template-modal-background').html());

        $('body').append($backgroundModal.fadeTo(0, 0.01));
        $('body').append($aboutModal.fadeTo(0, 0.01));

        $('#modal-background').fadeTo(100, 1);
        $('#about-modal').fadeTo(100, 1);

        $('#close-about-button').on('click', () => {
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

    // build genre checkbox
    const $genreFieldset: JQuery<HTMLElement> = $('#genre-fieldset');
    const $checkboxTemplate: string = $('#checkbox-template').html();

    interface GenreCheckbox {
        label: string;
        value: number;
    }

    const genres: GenreCheckbox[] = [
        { label: 'Action', value: 1 },
        { label: 'Adventure', value: 2 },
        { label: 'Cars', value: 3 },
        { label: 'Comedy', value: 4 },
        { label: 'Dementia', value: 5 },
        { label: 'Demons', value: 6 },
        { label: 'Mystery', value: 7 },
        { label: 'Drama', value: 8 },
        { label: 'Ecchi', value: 9 },
        { label: 'Fantasy', value: 10 },
        { label: 'Fame', value: 11 },
        { label: 'Hentai', value: 12 },
        { label: 'Historical', value: 13 },
        { label: 'Horror', value: 14 },
        { label: 'Kids', value: 15 },
        { label: 'Magic', value: 16 },
        { label: 'Martial arts', value: 17 },
        { label: 'Mecha', value: 18 },
        { label: 'Music', value: 19 },
        { label: 'Parody', value: 20 },
        { label: 'Samurai', value: 21 },
        { label: 'Romance', value: 22 },
        { label: 'School', value: 23 },
        { label: 'Sci Fi', value: 24 },
        { label: 'Shoujo', value: 25 },
        { label: 'Shoujo Ai', value: 26 },
        { label: 'Shounen', value: 27 },
        { label: 'Shounen Ai', value: 28 },
        { label: 'Space', value: 29 },
        { label: 'Sports', value: 30 },
        { label: 'Super Power', value: 31 },
        { label: 'Vampire', value: 32 },
        { label: 'Yaoi', value: 33 },
        { label: 'Yuri', value: 34 },
        { label: 'Harem', value: 35 },
        { label: 'Slice of Life', value: 36 },
        { label: 'Supernatural', value: 37 },
        { label: 'Military', value: 38 },
        { label: 'Police', value: 39 },
        { label: 'Psychological', value: 40 },
        { label: 'Thriller', value: 41 },
        { label: 'Seinen', value: 42 },
        { label: 'Josei', value: 43 },
    ];

    for (let i = 0; i < genres.length; i += 1) {
        const content = $checkboxTemplate
            .replace(/{{value}}/g, genres[i].value.toString())
            .replace(/{{id}}/g, genres[i].label.replace(' ', '-'))
            .replace(/{{label}}/g, genres[i].label)
            .replace(/{{default_state}}/g, 'checked');

        $genreFieldset.append($(content));
    }

    // auto scroll
    $(window).scroll(() => {
        if ($('.result-container').children().length === 0) {
            return;
        }

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
