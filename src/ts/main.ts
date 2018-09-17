/**
 * returns a string of parameter values from the checkboxes checked in advanced options
 * @param ids An array of IDs attached to the checkboxes to get the state of
 */
function getCheckboxState(ids: string[]): string {
    let contentValue: string = '';

    for (let i = 0; i < ids.length; i += 1) {
        const $checkbox = $(`#${ids[i]}`);

        if ($checkbox.is(':checked')) {
            if (contentValue.length !== 0) {
                contentValue += ',';
            }
            contentValue += $checkbox.val();
        }
    }

    return contentValue;
}

/**
 * Interface for url parameter builder. Represents the input IDs of the checkboxes
 * and the name of the param.
 */
interface ParamDetails {
    name: string;
    inputs: string[];
}

/**
 * builds a section of the URL parameter and returns it as a string. Will return
 * an empty string if no values are to be sent.
 * @param paramDetails Object representing the details of the parameter to be built
 */
function buildUrlParameter(paramDetails: ParamDetails): string {
    const contentParam: string = `&${paramDetails.name}=`;
    const contentValue: string = getCheckboxState(paramDetails.inputs);
    if (contentValue.length !== 0) {
        return `${contentParam}${contentValue}`;
    }

    return '';
}

/**
 * Builds the url to perform an AJAX search from MAL using Jikan
 */
function buildSearchUrl(page: string): string {
    const baseUrl: string = 'https://api.jikan.moe/v3/search/anime';
    const searchParam: string = '?q=';
    const searchValue = $('#search-box').val();

    const contentParamDetails: ParamDetails = {
        name: 'type',
        inputs: ['tvCheckBox', 'ovaCheckBox', 'movieCheckBox', 'specialCheckBox'],
    };

    const statusParamDetails: ParamDetails = {
        name: 'status',
        inputs: ['airingCheckBox', 'completedCheckBox', 'upcomingCheckBox'],
    };

    const ratingParamDetails: ParamDetails = {
        name: 'rating',
        inputs: [
            'gCheckBox',
            'pgCheckBox',
            'pg13CheckBox',
            'r17CheckBox',
            'rCheckBox',
            'rxCheckBox',
        ],
    };

    const contentTypeParam: string = buildUrlParameter(contentParamDetails);
    const statusParam: string = buildUrlParameter(statusParamDetails);
    const ratingParam: string = buildUrlParameter(ratingParamDetails);
    const pageParam: string = `&page=${page}`;

    return `${baseUrl}${searchParam}${searchValue}${contentTypeParam}${statusParam}${ratingParam}${pageParam}`;
}

/**
 * Gets search results from MAL
 */
function getSearchResults(page: string) {
    const fullUrl: string = buildSearchUrl(page);

    console.log(fullUrl);

    fetch(fullUrl)
        .then(
            (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed!');
            },
            (networkError) => console.log(networkError.message)
        )
        .then((jsonResponse) => {
            console.log(jsonResponse);
        });
}

/**
 * Toggles an element visible or hidden based on consistent parameters
 * @param $element Element to be toggled
 */
function toggleElement($element: JQuery<HTMLElement>) {
    $element.slideToggle({
        duration: 200,
        easing: 'swing',
    });
}

$('document').ready(() => {
    const $advancedOptions: JQuery<HTMLElement> = $('#advanced-options');
    const $advancedButton: JQuery<HTMLElement> = $('#advanced-button');

    $advancedOptions.hide();

    // toggles advanced options menu display
    $advancedButton.on('click', () => {
        toggleElement($advancedOptions);
    });

    $('#search-button').on('click', () => {
        if ($advancedButton.is(':visible')) {
            toggleElement($advancedOptions);
        }
        getSearchResults('1');
    });
});
