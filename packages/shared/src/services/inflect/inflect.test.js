import inflect from './inflect';

describe('inflect', () => {
    test('should return the list of inflection responses for the given lemma and affix types', async () => {
        const expectedResponses = ['response1', 'response2'];
        fetch.mockResponseOnce(JSON.stringify({
            morpherEngineResponses: expectedResponses
        }));
        
        await expect(inflect('input', [])).resolves.toEqual(expectedResponses);
    });
});
