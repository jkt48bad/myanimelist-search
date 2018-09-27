/**
 * Contains logic for performing a search using the Jikan API
 */

import advancedOptions = require('./advancedOptions');
import details = require('./details');

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
    const genreParam: string = advancedOptions.buildUrlParameter(advancedOptions.params.genre);
    const scoreParam: string = advancedOptions.buildUrlParameter(advancedOptions.params.score);
    const pageParam: string = `&page=${page}`;

    return `${baseUrl}${searchParam}${searchValue}${contentTypeParam}${statusParam}${ratingParam}${genreParam}${scoreParam}${pageParam}`;
}

/**
 * Renders the search results to the page
 * @param jsonResponse json response containing search results
 */
function renderSearchResults(jsonResponse: any) {
    const results: SearchResult[] = jsonResponse.results;
    const template: string = $('#template-anime-card').html();

    for (let i: number = 0; i < results.length; i += 1) {
        const content = template
            .replace(/{{id}}/g, results[i].mal_id.toString())
            .replace(/{{title}}/g, results[i].title)
            .replace(/{{image_url}}/g, results[i].image_url)
            .replace(/{{synopsis}}/g, results[i].synopsis)
            .replace(/{{type}}/g, results[i].type)
            .replace(/{{episodes}}/g, results[i].episodes.toString())
            .replace(/{{score}}/g, results[i].score.toString());
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

    $('.search-result').on('click', (event) => {
        const animeID: number = Number.parseFloat($(event.target)
            .closest('.search-result')
            .attr('id') as string);

        console.log(animeID);
        details.getDetailedResults(animeID);
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
