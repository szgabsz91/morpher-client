import React from 'react';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import MorpherStep from './MorpherStep';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

import { inflectionResponse } from '@szg/morpher-client-shared';

describe('MorpherStep', () => {
  let props;

  beforeEach(() => {
    props = {
      step: inflectionResponse.steps[0]
    };
  });

  test('should display the affix type', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherStep {...props} />
      </NativeBaseProvider>
    );

    const affixTypeText = queryByTestId('affix-type-text');
    expect(affixTypeText).toBeTruthy();
    expect(affixTypeText.props.children).toBe(
      `affixTypes:${props.step.affixType}.DisplayName`
    );
  });

  test('should display the lemma if the affix type is a POS', () => {
    props = {
      ...props,
      step: {
        ...props.step,
        affixType: `/${props.step.affixType}`
      }
    };

    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherStep {...props} />
      </NativeBaseProvider>
    );

    const subheaders = queryAllByTestId('subheader');
    expect(subheaders).toBeTruthy();
    expect(subheaders.length).toBe(2);

    const transformationSubheader = subheaders[0];
    expect(transformationSubheader).toBeTruthy();
    expect(transformationSubheader.props.children).toBe(props.step.output);
  });

  test('should display the transformation if the affix type is not a POS', () => {
    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherStep {...props} />
      </NativeBaseProvider>
    );

    const subheaders = queryAllByTestId('subheader');
    expect(subheaders).toBeTruthy();
    expect(subheaders.length).toBe(2);

    const transformationSubheader = subheaders[0];
    expect(transformationSubheader).toBeTruthy();
    expect(transformationSubheader.props.children).toBe('affixTypes:Sample');
  });

  test('should display the aggregated probability', () => {
    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherStep {...props} />
      </NativeBaseProvider>
    );

    const subheaders = queryAllByTestId('subheader');
    expect(subheaders).toBeTruthy();
    expect(subheaders.length).toBe(2);

    const aggregatedProbabilitySubheader = subheaders[1];
    expect(aggregatedProbabilitySubheader).toBeTruthy();
    expect(aggregatedProbabilitySubheader.props.children).toBe(
      props.step.aggregatedProbability
    );
  });
});
