/**
 * Interface for detailed result from Jikan.
 */
interface DetailResult {
    mal_id: number;
    image_url: string;
    title: string;
    title_english: string;
    title_japanese: string;
    type: string;
    episodes: number;
    aired: {
        string: string;
    };
    duration: string;
    rating: string;
    score: number;
    rank: number;
    synopsis: string;
    background: string;
    premiered: string;
    genres: Genre[];
    opening_themes: string[];
    ending_themes: string[];
    related: {
        Adaptation: RelatedAnime[];
        Sequel: RelatedAnime[];
        Summary: RelatedAnime[];
        'Side story': RelatedAnime[];
        Other: RelatedAnime[];
        [key: string]: RelatedAnime[];
    };
    studios: Studios[];
}

/**
 * Interface for genre results
 */
interface Genre {
    mal_id: number;
    name: string;
}

/**
 * Interface for related anime results
 */
interface RelatedAnime {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

/**
 * Interface for studios results
 */
interface Studios {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

/**
 * Renders the detailed result to the page
 * @param jsonResponse json response containing detail results
 */
function renderDetailResult(jsonResponse: any) {
    const result: DetailResult = jsonResponse;
    const dateResult: string[] = result.aired.string.split(' to ');

    const template: string = $('#template-anime-modal').html();
    const bubbleTemplate: string = $('#template-bubble').html();
    const relatedAnimeTemplate: string = $('#template-related-anime').html();

    let genreResult = '';
    for (let i = 0; i < result.genres.length; i += 1) {
        genreResult += bubbleTemplate.replace(/{{text}}/g, result.genres[i].name);
    }

    let studiosResult = '';
    for (let i = 0; i < result.studios.length; i += 1) {
        studiosResult += bubbleTemplate.replace(/{{text}}/g, result.studios[i].name);
    }

    let themeOpeningResult = '';
    for (let i = 0; i < result.opening_themes.length; i += 1) {
        themeOpeningResult += bubbleTemplate.replace(/{{text}}/g, result.opening_themes[i]);
    }

    let themeClosingResult = '';
    for (let i = 0; i < result.ending_themes.length; i += 1) {
        themeClosingResult += bubbleTemplate.replace(/{{text}}/g, result.ending_themes[i]);
    }

    let relatedAnimeResult = '';
    for (const property in result.related) {
        if (result.related.hasOwnProperty(property)) {
            for (let i = 0; i < result.related[property].length; i += 1) {
                const entry = result.related[property][i];

                console.log(entry.type);

                if (entry.type === 'novel' || entry.type === 'manga') {
                    continue;
                }

                relatedAnimeResult += relatedAnimeTemplate
                    .replace(/{{related_id}}/g, entry.mal_id.toString())
                    .replace(/{{type}}/g, property)
                    .replace(/{{name}}/g, entry.name);
            }
        }
    }

    const content = template
        .replace(/{{id}}/g, result.mal_id.toString())
        .replace(/{{title}}/g, result.title)
        .replace(/{{image_url}}/g, result.image_url)
        .replace(/{{score}}/g, result.score === null ? 'N/A' : result.score.toString())
        .replace(/{{rank}}/g, result.score === null ? 'N/A' : result.rank.toString())
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

    const $backgroundModal: JQuery<HTMLElement> = $($('#template-modal-background').html());
    const $contentOut: JQuery<HTMLElement> = $(content);

    if (result.background === null) {
        console.log($contentOut.find('.background'));
        $contentOut.find('.background')[0].remove();
    }

    $('body').append($backgroundModal.fadeTo(0, 0.01));
    $('body').append($contentOut.fadeTo(0, 0.01));

    $('#modal-background').fadeTo(100, 1);
    $(`#${result.mal_id}-modal`).fadeTo(100, 1);

    $(`#close-${result.mal_id}-button`).on('click', () => {
        $('#modal-background').fadeTo(100, 0.01);
        $(`#${result.mal_id}-modal`).fadeTo(100, 0.01);
        $(`#${result.mal_id}-modal`)
            .delay(100)
            .remove();
        $(`#modal-background`)
            .delay(100)
            .remove();
    });

    $(`#${result.mal_id}-modal`)
        .find('.related-anime-entry')
        .on('click', (event) => {
            const id: number = Number.parseFloat($(event.target).attr('id') as string);

            getDetailedResults(id);

            $(`#close-${result.mal_id}-button`).click();
        });
}

/**
 * Gets detailed result from MAL
 */
export function getDetailedResults(id: number) {
    const fullUrl: string = `https://api.jikan.moe/v3/anime/${id}`;

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
            renderDetailResult(jsonResponse);
        });
}
