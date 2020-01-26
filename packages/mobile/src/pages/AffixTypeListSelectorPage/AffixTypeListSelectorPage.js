import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button, Container, Content, Segment, Text } from 'native-base';

import AffixTypeListSelectorPageTitle from './AffixTypeListSelectorPageTitle';
import AffixTypeListSelectorPageHeaderRightIcon from './AffixTypeListSelectorPageHeaderRightIcon';
import AffixTypeList from './AffixTypeList';
import BackButton from '../../components/BackButton/BackButton';

import useApiUrl from '../../hooks/useApiUrl';

import { getSupportedAffixTypes } from '@szg/morpher-client-shared';

export default function AffixTypeListSelectorPage({ navigation }) {
  const [t] = useTranslation('affixTypes');
  const [apiUrl] = useApiUrl();
  const [isFirstTabSelected, setFirstTabSelected] = useState(true);
  const [affixTypes, setAffixTypes] = useState([]);

  const selectedAffixTypes = navigation.getParam('selectedAffixTypes', []);

  useEffect(() => {
    getSupportedAffixTypes(apiUrl)
      .then(setAffixTypes);
  }, [apiUrl]);

  const onSelectedAffixTypesChanged = newlySelectedAffixTypes => {
    navigation.setParams({
      selectedAffixTypes: newlySelectedAffixTypes
    });
  };

  return (
    <Container>
      <Segment>
        <Button
          first
          active={isFirstTabSelected}
          onPress={() => setFirstTabSelected(true)}
          testID="first-segment-button"
        >
          <Text testID="first-segment-button-text">{t('tabs.All')}</Text>
        </Button>

        <Button
          last
          active={!isFirstTabSelected}
          onPress={() => setFirstTabSelected(false)}
          testID="second-segment-button"
        >
          <Text testID="second-segment-button-text">{t('tabs.Selected')}</Text>
        </Button>
      </Segment>

      <Content padder>
        {
          isFirstTabSelected ? (
            <AffixTypeList
              affixTypes={affixTypes}
              selectedAffixTypes={selectedAffixTypes}
              onSelectedAffixTypesChanged={onSelectedAffixTypesChanged}
              testID="all-affix-types"
            />
          ) : (
            <AffixTypeList
              affixTypes={affixTypes.filter(affixType =>
                selectedAffixTypes.includes(affixType)
              )}
              emptyMessage={t('NoAffixTypesSelected')}
              selectedAffixTypes={selectedAffixTypes}
              onSelectedAffixTypesChanged={onSelectedAffixTypesChanged}
              testID="selected-affix-types"
            />
          )
        }
      </Content>
    </Container>
  );
}

AffixTypeListSelectorPage.propTypes = {
  navigation: PropTypes.object.isRequired
};

AffixTypeListSelectorPage.navigationOptions = ({ navigation }) => ({
  headerTitle: () => <AffixTypeListSelectorPageTitle />,
  headerLeft: () => <BackButton navigation={navigation} />,
  headerRight: () => <AffixTypeListSelectorPageHeaderRightIcon navigation={navigation} />
});
