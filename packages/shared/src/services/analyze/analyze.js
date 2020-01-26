export default function analyze(input, hostname = '') {
    return fetch(`${hostname}/morpher/languages/hu/analyze?input=${input}`)
        .then(response => response.json())
        .then(response => response.morpherEngineResponses);
}
