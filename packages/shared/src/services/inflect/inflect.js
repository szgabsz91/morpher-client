export default function inflect(input, affixTypes) {
    return fetch(`morpher/languages/hu/inflect?input=${input}&affix-types=${affixTypes.join(',')}`)
        .then(response => response.json())
        .then(response => response.morpherEngineResponses);
}
