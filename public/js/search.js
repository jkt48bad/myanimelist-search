/**
 * Contains logic for performing a search using the Jikan API
 */
define(["require", "exports", "./advancedOptions"], function (require, exports, advancedOptions) {
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
        var pageParam = "&page=" + page;
        return "" + baseUrl + searchParam + searchValue + contentTypeParam + statusParam + ratingParam + pageParam;
    }
    /**
     * Renders the search results to the page
     * @param jsonResponse json response containing search results
     */
    function renderSearchResults(jsonResponse) {
        var results = jsonResponse.results;
        for (var i = 0; i < results.length; i += 1) {
            var content = "<div class=\"material-card search-result\">\n        <div class=\"top-section\">\n            <div class=\"image\">\n                <img src=\"" + results[i].image_url + "\"\n                    alt=\"" + results[i].title + "\">\n            </div>\n            <div class=\"details\">\n                <h2>" + results[i].title + "</h2>\n                <p>" + results[i].synopsis + "</p>\n            </div>\n        </div>\n        <div class=\"info\">\n            <span title=\"Content Type\"><i class=\"fas fa-tv\"></i> " + results[i].type + "</span>\n            <span title=\"Episode Count\"><i class=\"fas fa-list-ol\"></i> " + results[i].episodes + "</span>\n            <span title=\"User Rating\"><i class=\"fas fa-star\"></i> " + results[i].score + "</span>\n        </div>\n    </div>";
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