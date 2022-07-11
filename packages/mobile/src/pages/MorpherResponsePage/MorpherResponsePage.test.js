import React from 'react';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import MorpherResponsePage from './MorpherResponsePage';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

import { inflectionResponse, analysisResponse } from '@szg/morpher-client-shared';

describe('MorpherResponsePage', () => {
  let props;

  beforeEach(() => {
    props = {
      route: {
        params: {
          response: inflectionResponse
        }
      }
    };
  });

  test('should display the list of responses with POS as the first item in case of inflection generation', () => {
    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherResponsePage {...props} />
      </NativeBaseProvider>
    );

    const affixTypeTexts = queryAllByTestId('affix-type-text');
    expect(affixTypeTexts).toBeTruthy();

    const affixTypes = affixTypeTexts.map(
      affixTypeText => affixTypeText.props.children
    );
    const expectedAffixTypes = [
      inflectionResponse.pos.affixType,
      ...inflectionResponse.steps.map(step => step.affixType)
    ].map(affixType => `affixTypes:${affixType}.DisplayName`);
    expect(affixTypes).toEqual(expectedAffixTypes);
  });

  test('should display the list of responses with POS as the last item in case of morphological analysis', () => {
    props = {
      route: {
        params: {
          response: analysisResponse
        }
      }
    };

    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherResponsePage {...props} />
      </NativeBaseProvider>
    );

    const affixTypeTexts = queryAllByTestId('affix-type-text');
    expect(affixTypeTexts).toBeTruthy();

    const affixTypes = affixTypeTexts.map(
      affixTypeText => affixTypeText.props.children
    );
    const expectedAffixTypes = [
      ...analysisResponse.steps.map(step => step.affixType),
      analysisResponse.pos.affixType
    ].map(affixType => `affixTypes:${affixType}.DisplayName`);
    expect(affixTypes).toEqual(expectedAffixTypes);
  });
});
