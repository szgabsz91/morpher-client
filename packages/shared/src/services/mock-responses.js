export const inflectionResponse = {
    mode: 'INFLECTION',
    input: 'alma',
    output: 'almákat',
    pos: {
        affixType: '/NOUN',
        probability: 0.3
    },
    affixTypeChainProbability: 0.4,
    normalizedAffixTypeChainProbability: 0.7,
    aggregatedWeight: 0.71,
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
    }]
};

export const analysisResponses = [{
    mode: 'ANALYSIS',
    input: 'rendeltetésem',
    output: 'rendeltetés',
    pos: {
        affixType: '/NOUN',
        probability: 0.14
    },
    affixTypeChainProbability: 0.1,
    normalizedAffixTypeChainProbability: 0.11,
    aggregatedWeight: 0.73,
    steps: [{
        input: 'rendeltetésem',
        output: 'rendeltetés',
        affixType: '<POSS<1>>',
        affixTypeProbability: 0.12,
        outputWordProbability: 0.13,
        aggregatedProbability: 0.32
    }]
}, {
    mode: 'ANALYSIS',
    input: 'rendeltetésem',
    output: 'rendel',
    pos: {
        affixType: '/VERB',
        probability: 0.14
    },
    affixTypeChainProbability: 0.15,
    normalizedAffixTypeChainProbability: 0.16,
    aggregatedWeight: 0.17,
    steps: [{
        input: 'rendeltetésem',
        output: 'rendeltetés',
        affixType: '<POSS<1>>',
        affixTypeProbability: 0.18,
        outputWordProbability: 0.19,
        aggregatedProbability: 0.2
    }, {
        input: 'rendeltetés',
        output: 'rendeltet',
        affixType: '[ATTR]',
        affixTypeProbability: 0.21,
        outputWordProbability: 1.22,
        aggregatedProbability: 0.23
    }, {
        input: 'rendeltet',
        output: 'rendel',
        affixType: '[CAUS]',
        affixTypeProbability: 0.24,
        outputWordProbability: 0.25,
        aggregatedProbability: 0.26
    }]
}];

export const analysisResponse = analysisResponses[0];
