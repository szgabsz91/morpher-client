export default function analyze(input) {
    return fetch(`morpher/languages/hu/analyze?input=${input}`)
        .then(response => response.json())
        .then(response => response.morpherEngineResponses);
}
