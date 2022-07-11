import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import AffixTypeListSelectorPageHeaderRightIcon from './AffixTypeListSelectorPageHeaderRightIcon';
import AffixTypeList from './AffixTypeList';

import useApiUrl from '../../hooks/useApiUrl';

import { getSupportedAffixTypes } from '@szg/morpher-client-shared';

const initialLayout = {
  width: Dimensions.get('window').width
};

export const AllAffixTypes = ({ route }) => (
  <AffixTypeList
    affixTypes={route.affixTypes}
    selectedAffixTypes={route.selectedAffixTypes}
    onSelectedAffixTypesChanged={route.onSelectedAffixTypesChanged}
    testID="all-affix-types"
  />
);

AllAffixTypes.propTypes = {
  route: PropTypes.shape({
    affixTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedAffixTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelectedAffixTypesChanged: PropTypes.func.isRequired
  }).isRequired
};

export const SelectedAffixTypes = ({ route }) => {
  const [t] = useTranslation('affixTypes');

  return (
    <AffixTypeList
      affixTypes={route.affixTypes.filter(affixType => route.selectedAffixTypes.includes(affixType))}
      emptyMessage={t('NoAffixTypesSelected')}
      selectedAffixTypes={route.selectedAffixTypes}
      onSelectedAffixTypesChanged={route.onSelectedAffixTypesChanged}
      testID="selected-affix-types"
    />
  );
};

SelectedAffixTypes.propTypes = {
  route: PropTypes.object.isRequired
};

const renderScene = SceneMap({
  all: AllAffixTypes,
  selected: SelectedAffixTypes
});

export default function AffixTypeListSelectorPage({ navigation, route }) {
  const [t] = useTranslation('affixTypes');
  const [apiUrl] = useApiUrl();
  const [isFirstTabSelected, setFirstTabSelected] = useState(true);
  const [affixTypes, setAffixTypes] = useState([]);

  const selectedAffixTypes = route.params.selectedAffixTypes;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AffixTypeListSelectorPageHeaderRightIcon navigation={navigation} route={route} />
    });
  }, [route.params.selectedAffixTypes]);

  useEffect(() => {
    getSupportedAffixTypes(apiUrl)
      .then(setAffixTypes);
  }, [apiUrl]);

  const onSelectedAffixTypesChanged = newlySelectedAffixTypes => {
    navigation.setParams({
      selectedAffixTypes: newlySelectedAffixTypes
    });
  };

  return affixTypes.length > 0 && (
    <TabView
      navigationState={{
        index: isFirstTabSelected ? 0 : 1,
        routes: [{
          key: 'all',
          title: t('tabs.All'),
          affixTypes,
          selectedAffixTypes,
          onSelectedAffixTypesChanged
        }, {
          key: 'selected',
          title: t('tabs.Selected'),
          affixTypes,
          selectedAffixTypes,
          onSelectedAffixTypesChanged
        }]
      }}
      renderScene={renderScene}
      style={{
        marginTop: StatusBar.currentHeight
      }}
      initialLayout={initialLayout}
      onIndexChange={index => setFirstTabSelected(index === 0)}
      testID="tabview"
    />
  );
}

AffixTypeListSelectorPage.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      selectedAffixTypes: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  }).isRequired
};
