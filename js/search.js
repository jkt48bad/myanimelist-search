/**
 * Contains logic for performing a search using the Jikan API
 */
define(["require", "exports", "./advancedOptions", "./details"], function (require, exports, advancedOptions, details) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Builds the url to perform an AJAX search from MAL using Jikan
     */
    function buildSearchUrl(page) {
        var baseUrl = 'https://api.jikan.moe/v3/search/anime';
        var searchParam = '?q=';
        var searchValue = $('#search-box').val();
        var contentTypeParam = advancedOptions.buildUrlParameter(advancedOptions.params.content);
        var statusParam = advancedOptions.buildUrlParameter(advancedOptions.params.status);
        var ratingParam = advancedOptions.buildUrlParameter(advancedOptions.params.rating);
        var genreParam = advancedOptions.buildUrlParameter(advancedOptions.params.genre);
        var scoreParam = advancedOptions.buildUrlParameter(advancedOptions.params.score);
        var pageParam = "&page=" + page;
        return "" + baseUrl + searchParam + searchValue + contentTypeParam + statusParam + ratingParam + genreParam + scoreParam + pageParam;
    }
    /**
     * Renders the search results to the page
     * @param jsonResponse json response containing search results
     */
    function renderSearchResults(jsonResponse) {
        var results = jsonResponse.results;
        var template = $('#template-anime-card').html();
        for (var i = 0; i < results.length; i += 1) {
            var content = template
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
            .each(function (index, ele) {
            $(ele)
                .delay(50 * index)
                .fadeTo(100, 1);
        });
        $('.search-result').on('click', function (event) {
            var animeID = Number.parseFloat($(event.target)
                .closest('.search-result')
                .attr('id'));
            console.log(animeID);
            details.getDetailedResults(animeID);
        });
    }
    /**
     * Gets search results from MAL
     */
    function getSearchResults(page) {
        var fullUrl = buildSearchUrl(page);
        console.log(fullUrl);
        fetch(fullUrl)
            .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, function (networkError) { return console.log(networkError.message); })
            .then(function (jsonResponse) {
            renderSearchResults(jsonResponse);
        });
    }
    exports.getSearchResults = getSearchResults;
});
//# sourceMappingURL=search.js.map