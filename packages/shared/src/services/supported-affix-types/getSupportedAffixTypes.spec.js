import getSupportedAffixTypes from './getSupportedAffixTypes';

describe('getSupportedAffixTypes', () => {
    test('should return the list of supported affix types from Morpher API', async () => {
        const expectedAffixTypes = ['AFF1', 'AFF2'];
        fetch.mockResponseOnce(JSON.stringify(expectedAffixTypes));
        
        await expect(getSupportedAffixTypes()).resolves.toEqual(expectedAffixTypes);
    });
});
