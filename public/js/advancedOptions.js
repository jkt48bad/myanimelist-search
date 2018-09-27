/**
 * Contains the logic for building the URL parameters for the advanced options
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.params = {
        content: {
            name: 'type',
            inputs: ['tvCheckBox', 'ovaCheckBox', 'movieCheckBox', 'specialCheckBox'],
        },
        status: {
            name: 'status',
            inputs: ['airingCheckBox', 'completedCheckBox', 'upcomingCheckBox'],
        },
        rating: {
            name: 'rating',
            inputs: [
                'gCheckBox',
                'pgCheckBox',
                'pg13CheckBox',
                'r17CheckBox',
                'rCheckBox',
                'rxCheckBox',
            ],
        },
        genre: {
            name: 'genre',
            inputs: [
                'Action',
                'Adventure',
                'Cars',
                'Comedy',
                'Dementia',
                'Demons',
                'Mystery',
                'Drama',
                'Ecchi',
                'Fantasy',
                'Fame',
                'Hentai',
                'Historical',
                'Horror',
                'Kids',
                'Magic',
                'Martial-arts',
                'Mecha',
                'Music',
                'Parody',
                'Samurai',
                'Romance',
                'School',
                'Sci-Fi',
                'Shoujo',
                'Shoujo-Ai',
                'Shounen',
                'Shounen-Ai',
                'Space',
                'Sports',
                'Super-Power',
                'Vampire',
                'Yaoi',
                'Yuri',
                'Harem',
                'Slice-of-Life',
                'Supernatural',
                'Military',
                'Police',
                'Psychological',
                'Thriller',
                'Seinen',
                'Josei',
            ],
        },
        score: {
            name: 'score',
            inputs: ['minScore-box'],
        },
    };
    /**
     * returns a string of parameter values from the checkboxes checked in advanced options
     * @param ids An array of IDs attached to the checkboxes to get the state of
     */
    function getInputState(ids) {
        var contentValue = '';
        for (var i = 0; i < ids.length; i += 1) {
            var $input = $("#" + ids[i]);
            if ($input.attr('type') === 'checkbox') {
                if ($input.is(':checked')) {
                    if (contentValue.length !== 0) {
                        contentValue += ',';
                    }
                    contentValue += $input.val();
                }
            }
            if ($input.attr('type') === 'number') {
                if ($input.val().length > 0) {
                    contentValue += $input.val();
                }
                else {
                    contentValue += '0';
                }
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
        var contentValue = getInputState(paramDetails.inputs);
        if (contentValue.length !== 0) {
            return "" + contentParam + contentValue;
        }
        return '';
    }
    exports.buildUrlParameter = buildUrlParameter;
});
//# sourceMappingURL=advancedOptions.js.map