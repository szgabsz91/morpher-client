import analyze from './analyze';

describe('analyze', () => {
    test('should return the list of analysis responses for the given inflected word form', async () => {
        const expectedResponses = ['response1', 'response2'];
        fetch.mockResponseOnce(JSON.stringify({
            morpherEngineResponses: expectedResponses
        }));
        
        await expect(analyze('input')).resolves.toEqual(expectedResponses);
    });
});
