/**
 * Contains logic for performing a search using the Jikan API
 */

import advancedOptions = require('./advancedOptions');

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
 * Builds the url to perform an AJAX search from MAL using Jikan
 */
function buildSearchUrl(page: string): string {
    const baseUrl: string = 'https://api.jikan.moe/v3/search/anime';
    const searchParam: string = '?q=';
    const searchValue = $('#search-box').val();

    const contentTypeParam: string = advancedOptions.buildUrlParameter(
        advancedOptions.params.content
    );
    const statusParam: string = advancedOptions.buildUrlParameter(advancedOptions.params.status);
    const ratingParam: string = advancedOptions.buildUrlParameter(advancedOptions.params.rating);
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
            <span class="bubble" title="Content Type"><i class="fas fa-tv"></i> ${results[i].type}</span>
            <span class="bubble" title="Episode Count"><i class="fas fa-list-ol"></i> ${results[i].episodes}</span>
            <span class="bubble" title="User Rating"><i class="fas fa-star"></i> ${results[i].score}</span>
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
                .delay(50 * index)
                .fadeTo(100, 1);
        });
}

/**
 * Gets search results from MAL
 */
export function getSearchResults(page: string) {
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
