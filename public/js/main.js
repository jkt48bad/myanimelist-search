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
        console.log(jsonResponse);
    });
}
/**
 * Toggles an element visible or hidden based on consistent parameters
 * @param $element Element to be toggled
 */
function toggleElement($element) {
    $element.slideToggle({
        duration: 200,
        easing: 'swing',
    });
}
$('document').ready(function () {
    var $advancedOptions = $('#advanced-options');
    var $advancedButton = $('#advanced-button');
    $advancedOptions.hide();
    // toggles advanced options menu display
    $advancedButton.on('click', function () {
        toggleElement($advancedOptions);
    });
    $('#search-button').on('click', function () {
        if ($advancedButton.is(':visible')) {
            toggleElement($advancedOptions);
        }
        getSearchResults('1');
    });
});
//# sourceMappingURL=main.js.map