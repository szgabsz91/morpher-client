
export const inflectionResponse = {
    mode: 'INFLECTION',
    input: 'alma',
    output: 'almákat',
    pos: {
        affixType: '/NOUN',
        probability: 0.3
    },
    affixTypeChainProbability: 0.4,
    steps: [{
        input: 'alma',
        output: 'almák',
        affixType: '<PLUR>',
        affixTypeProbability: 0.5,
        outputWordProbability: 0.51,
        aggregatedProbability: 0.52
    }, {
        input: 'almák',
        output: 'almákat',
        affixType: '<CAS<ACC>>',
        affixTypeProbability: 0.6,
        outputWordProbability: 0.61,
        aggregatedProbability: 0.62
    }],
    normalizedAffixTypeChainProbability: 0.7,
    aggregatedWeight: 0.71
};

export const analysisResponse = {
    mode: 'ANALYSIS',
    input: 'almákat',
    output: 'alma',
    pos: {
        affixType: '/NOUN',
        probability: 0.1
    },
    affixTypeChainProbability: 0.2,
    steps: [{
        input: 'almákat',
        output: 'almák',
        affixType: '<CAS<ACC>>',
        affixTypeProbability: 0.3,
        outputWordProbability: 0.31,
        aggregatedProbability: 0.32
    }, {
        input: 'almák',
        output: 'alma',
        affixType: '<PLUR>',
        affixTypeProbability: 0.4,
        outputWordProbability: 0.41,
        aggregatedProbability: 0.42
    }],
    normalizedAffixTypeChainProbability: 0.5,
    aggregatedWeight: 0.51
};
