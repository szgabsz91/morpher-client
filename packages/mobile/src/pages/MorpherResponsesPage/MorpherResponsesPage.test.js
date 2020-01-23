import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { when } from 'jest-when';

import MorpherResponsesPage from './MorpherResponsesPage';

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

describe('MorpherResponsesPage', () => {
  let props;

  beforeEach(() => {
    props = {
      navigation: {
        getParam: jest.fn(),
        navigate: jest.fn()
      }
    };

    when(props.navigation.getParam)
      .calledWith('responses', [])
      .mockReturnValue([inflectionResponse, analysisResponse]);
  });

  test('should display the list of responses', () => {
    const { queryAllByTestId } = render(
      <MorpherResponsesPage {...props} />
    );

    const subheaders = queryAllByTestId('subheader');
    expect(subheaders).toBeTruthy();
    expect(subheaders.length).toBe(1);
    expect(subheaders[0].props.children).toBe('AffixTypes');
  });

  test('should invoke onResponseSelected if a response is selected', () => {
    const { queryAllByTestId } = render(
      <MorpherResponsesPage {...props} />
    );

    const listItems = queryAllByTestId('list-item');
    expect(listItems).toBeTruthy();

    const analysisListItem = listItems[1];
    expect(analysisListItem).toBeTruthy();
    fireEvent.press(analysisListItem);

    expect(props.navigation.navigate).toBeCalledWith('MorpherResponse', {
      response: analysisResponse
    });
  });

  describe('navigationOptions', () => {
    let navigationOptions;

    beforeEach(() => {
      props = {
        navigation: {
          goBack: jest.fn()
        }
      };
      navigationOptions = MorpherResponsesPage.navigationOptions(props);
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
