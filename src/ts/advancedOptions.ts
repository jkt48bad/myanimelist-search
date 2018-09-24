/**
 * Contains the logic for building the URL parameters for the advanced options
 */

/**
 * Interface for url parameter builder. Represents the input IDs of the checkboxes
 * and the name of the param.
 */
interface ParamDetails {
    name: string;
    inputs: string[];
}

const advancedOptionsParams = {
    content: <ParamDetails>{
        name: 'type',
        inputs: ['tvCheckBox', 'ovaCheckBox', 'movieCheckBox', 'specialCheckBox'],
    },

    status: <ParamDetails>{
        name: 'status',
        inputs: ['airingCheckBox', 'completedCheckBox', 'upcomingCheckBox'],
    },

    rating: <ParamDetails>{
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
