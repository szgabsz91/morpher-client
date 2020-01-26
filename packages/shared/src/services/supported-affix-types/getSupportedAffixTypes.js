export default function getSupportedAffixTypes(hostname = '') {
    return fetch(`${hostname}/morpher/languages/hu/affix-types`)
        .then(response => response.json());
}
