"use strict";
/**
 * returns a string of parameter values from the checkboxes checked in advanced options
 * @param ids An array of IDs attached to the checkboxes to get the state of
 */
function getCheckboxState(ids) {
    var contentValue = '';
    for (var i = 0; i < ids.length; i += 1) {
        var $checkbox = $("#" + ids[i]);
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
function buildUrlParameter(paramDetails) {
    var contentParam = "&" + paramDetails.name + "=";
    var contentValue = getCheckboxState(paramDetails.inputs);
    if (contentValue.length !== 0) {
        return "" + contentParam + contentValue;
    }
    return '';
}
/**
 * Builds the url to perform an AJAX search from MAL using Jikan
 */
function buildSearchUrl(page) {
    var baseUrl = 'https://api.jikan.moe/v3/search/anime';
    var searchParam = '?q=';
    var searchValue = $('#search-box').val();
    var contentParamDetails = {
        name: 'type',
        inputs: ['tvCheckBox', 'ovaCheckBox', 'movieCheckBox', 'specialCheckBox'],
    };
    var statusParamDetails = {
        name: 'status',
        inputs: ['airingCheckBox', 'completedCheckBox', 'upcomingCheckBox'],
    };
    var ratingParamDetails = {
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
    var contentTypeParam = buildUrlParameter(contentParamDetails);
    var statusParam = buildUrlParameter(statusParamDetails);
    var ratingParam = buildUrlParameter(ratingParamDetails);
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
$('document').ready(function () {
    var $advancedOptions = $('#advanced-options');
    var $advancedButton = $('#advanced-button');
    var pageNumber = 1;
    $advancedOptions.hide();
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
        getSearchResults(pageNumber.toString());
    });
    // auto scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() ===
            $(document).height()) {
            $advancedOptions.slideUp(200);
            pageNumber += 1;
            getSearchResults(pageNumber.toString());
        }
    });
});
//# sourceMappingURL=main.js.map