export default function getSupportedAffixTypes() {
    return fetch('morpher/languages/hu/affix-types')
        .then(response => response.json());
}
