/**
 * Interface for search results from Jikan.
 */
interface SearchResult {
    airing: boolean;
    end_date: string;
    episodes: number;
    image_url: string;
    mal_id: number;
    members: number;
    rated: string;
    score: number;
    start_date: string;
    synopsis: string;
    title: string;
    type: string;
    url: string;
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
 * Renders the search results to the page
 * @param jsonResponse json response containing search results
 */
function renderSearchResults(jsonResponse: any) {
    const results: SearchResult[] = jsonResponse.results;

    for (let i: number = 0; i < results.length; i += 1) {
        const content: string = `<div class="material-card search-result">
        <div class="top-section">
            <div class="image">
                <img src="${results[i].image_url}"
                    alt="${results[i].title}">
            </div>
            <div class="details">
                <h2>${results[i].title}</h2>
                <p>${results[i].synopsis}</p>
            </div>
        </div>
        <div class="info">
            <span title="Content Type"><i class="fas fa-tv"></i> ${results[i].type}</span>
            <span title="Episode Count"><i class="fas fa-list-ol"></i> ${results[i].episodes}</span>
            <span title="User Rating"><i class="fas fa-star"></i> ${results[i].score}</span>
        </div>
    </div>`;
        // appends the results and sets their visability to near 0
        $('.result-container').append($(content).fadeTo(0, 0.01));
    }

    // Fades in the results 1 at a time
    $('.result-container')
        .children()
        .each((index, ele) => {
            $(ele)
                .delay(100 * index)
                .fadeTo(200, 1);
        });
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
            renderSearchResults(jsonResponse);
        });
}

$('document').ready(() => {
    const $advancedOptions: JQuery<HTMLElement> = $('#advanced-options');
    const $advancedButton: JQuery<HTMLElement> = $('#advanced-button');

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
        getSearchResults('1');
    });
});
