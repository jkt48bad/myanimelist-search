define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Renders the detailed result to the page
     * @param jsonResponse json response containing detail results
     */
    function renderDetailResult(jsonResponse) {
        var result = jsonResponse;
        var dateResult = result.aired.string.split(' to ');
        var template = $('#template-anime-modal').html();
        var bubbleTemplate = $('#template-bubble').html();
        var relatedAnimeTemplate = $('#template-related-anime').html();
        var genreResult = '';
        for (var i = 0; i < result.genres.length; i += 1) {
            genreResult += bubbleTemplate.replace(/{{text}}/g, result.genres[i].name);
        }
        var studiosResult = '';
        for (var i = 0; i < result.studios.length; i += 1) {
            studiosResult += bubbleTemplate.replace(/{{text}}/g, result.studios[i].name);
        }
        var themeOpeningResult = '';
        for (var i = 0; i < result.opening_themes.length; i += 1) {
            themeOpeningResult += bubbleTemplate.replace(/{{text}}/g, result.opening_themes[i]);
        }
        var themeClosingResult = '';
        for (var i = 0; i < result.opening_themes.length; i += 1) {
            themeClosingResult += bubbleTemplate.replace(/{{text}}/g, result.ending_themes[i]);
        }
        var relatedAnimeResult = '';
        for (var property in result.related) {
            if (result.related.hasOwnProperty(property)) {
                for (var i = 0; i < result.related[property].length; i += 1) {
                    relatedAnimeResult += relatedAnimeTemplate
                        .replace(/{{type}}/g, property)
                        .replace(/{{name}}/g, result.related[property][i].name);
                }
            }
        }
        var content = template
            .replace(/{{id}}/g, result.mal_id.toString())
            .replace(/{{title}}/g, result.title)
            .replace(/{{image_url}}/g, result.image_url)
            .replace(/{{score}}/g, result.score.toString())
            .replace(/{{rank}}/g, result.rank.toString())
            .replace(/{{title_english}}/g, result.title_english)
            .replace(/{{title_japanese}}/g, result.title_japanese)
            .replace(/{{aired_start}}/g, dateResult[0])
            .replace(/{{aired_end}}/g, dateResult[1])
            .replace(/{{genres}}/g, genreResult)
            .replace(/{{studios}}/g, studiosResult)
            .replace(/{{synopsis}}/g, result.synopsis)
            .replace(/{{background}}/g, result.background)
            .replace(/{{opening_themes}}/g, themeOpeningResult)
            .replace(/{{ending_themes}}/g, themeClosingResult)
            .replace(/{{related_anime}}/g, relatedAnimeResult)
            .replace(/{{type}}/g, result.type)
            .replace(/{{episodes}}/g, result.episodes.toString())
            .replace(/{{premiered}}/g, result.premiered)
            .replace(/{{duration}}/g, result.duration)
            .replace(/{{rating}}/g, result.rating);
        var $backgroundModal = $($('#template-modal-background').html());
        var $contentOut = $(content);
        if (result.background === null) {
            console.log($contentOut.find('.background'));
            $contentOut.find('.background')[0].remove();
        }
        $('body').append($backgroundModal.fadeTo(0, 0.01));
        $('body').append($contentOut.fadeTo(0, 0.01));
        $('#modal-background').fadeTo(100, 1);
        $("#" + result.mal_id + "-modal").fadeTo(100, 1);
        $("#close-" + result.mal_id + "-button").on('click', function () {
            $('#modal-background').fadeTo(100, 0.01);
            $("#" + result.mal_id + "-modal").fadeTo(100, 0.01);
            $("#" + result.mal_id + "-modal")
                .delay(100)
                .remove();
            $("#modal-background")
                .delay(100)
                .remove();
        });
    }
    /**
     * Gets detailed result from MAL
     */
    function getDetailedResults(id) {
        var fullUrl = "https://api.jikan.moe/v3/anime/" + id;
        console.log(fullUrl);
        fetch(fullUrl)
            .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, function (networkError) { return console.log(networkError.message); })
            .then(function (jsonResponse) {
            renderDetailResult(jsonResponse);
        });
    }
    exports.getDetailedResults = getDetailedResults;
});
//# sourceMappingURL=details.js.map