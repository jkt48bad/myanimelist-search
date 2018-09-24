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
    };
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
    exports.buildUrlParameter = buildUrlParameter;
});
//# sourceMappingURL=advancedOptions.js.map