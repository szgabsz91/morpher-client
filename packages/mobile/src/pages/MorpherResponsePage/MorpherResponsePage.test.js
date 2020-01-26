import React from 'react';
import { render } from '@testing-library/react-native';
import { when } from 'jest-when';

import MorpherResponsePage from './MorpherResponsePage';

import { inflectionResponse, analysisResponse } from '@szg/morpher-client-shared';

jest.mock('react-navigation-stack', () => {
  const { Text } = require('native-base');

  return {
    HeaderBackButton: ({ onPress }) => {
      onPress();
      return <Text>HeaderBackButton</Text>;
    }
  };
});

describe('MorpherResponsePage', () => {
  let props;

  beforeEach(() => {
    props = {
      navigation: {
        getParam: jest.fn()
      }
    };
  });

  test('should display the list of responses with POS as the first item in case of inflection generation', () => {
    when(props.navigation.getParam)
      .calledWith('response')
      .mockReturnValue(inflectionResponse);

    const { queryAllByTestId } = render(
      <MorpherResponsePage {...props} />
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
    when(props.navigation.getParam)
      .calledWith('response')
      .mockReturnValue(analysisResponse);

    const { queryAllByTestId } = render(
      <MorpherResponsePage {...props} />
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

  describe('navigationOptions', () => {
    let navigationOptions;

    beforeEach(() => {
      props = {
        navigation: {
          goBack: jest.fn()
        }
      };
      navigationOptions = MorpherResponsePage.navigationOptions(props);
    });

    describe('headerTitle', () => {
      it('should render the title of the page', () => {
        const HeaderTitle = navigationOptions.headerTitle;

        const { queryByTestId } = render(
          <HeaderTitle />
        );

        const title = queryByTestId('title');
        expect(title).toBeTruthy();
      });
    });

    describe('headerLeft', () => {
      it('should render the back button', () => {
        const HeaderLeft = navigationOptions.headerLeft;

        render(
          <HeaderLeft />
        );

        expect(props.navigation.goBack).toHaveBeenCalled();
      });
    });
  });
});
