import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Body, CheckBox, Input, Item, ListItem, Spinner, Text } from 'native-base';

import KeyValuePair from '../../components/KeyValuePair/KeyValuePair';

export default function AffixTypeList({
  affixTypes,
  emptyMessage,
  selectedAffixTypes: currentlySelectedAffixTypes,
  onSelectedAffixTypesChanged
}) {
  const [t] = useTranslation('affixTypes');
  const [affixTypeFilterString, setAffixTypeFilterString] = useState('');
  const [filteredAffixTypes, setFilteredAffixTypes] = useState(affixTypes);
  const [selectedAffixTypes, setSelectedAffixTypes] = useState(currentlySelectedAffixTypes);

  useEffect(() => filterAffixTypes(), [affixTypes, affixTypeFilterString]);
  useEffect(() => setSelectedAffixTypes(currentlySelectedAffixTypes), [currentlySelectedAffixTypes]);
  useEffect(() => onSelectedAffixTypesChanged(selectedAffixTypes), [selectedAffixTypes]);

  const toggleAffixType = affixType => {
    if (selectedAffixTypes.includes(affixType)) {
      setSelectedAffixTypes(
        selectedAffixTypes.filter(
          selectedAffixType => selectedAffixType !== affixType
        )
      );
    }
    else {
      setSelectedAffixTypes([...selectedAffixTypes, affixType]);
    }
  };

  const filterAffixTypes = () => {
    const newFilteredAffixTypes = affixTypes.filter(affixType => {
      const searchStrings = [
        affixType.toLowerCase(),
        t(`${affixType}.DisplayName`).toLowerCase(),
        t('Sample', {
          baseForm: t(`${affixType}.SampleBaseForm`),
          inflectedForm: t(`${affixType}.SampleInflectedForm`)
        })
      ];
      return searchStrings.some(searchString =>
        searchString.includes(affixTypeFilterString.toLowerCase())
      );
    });
    setFilteredAffixTypes(newFilteredAffixTypes);
  };

  const renderAffixType = ({ item: affixType }) => (
    <ListItem
      key={affixType}
      onPress={() => toggleAffixType(affixType)}
      testID="affix-type-list-item"
    >
      <CheckBox
        checked={selectedAffixTypes.includes(affixType)}
        onPress={() => toggleAffixType(affixType)}
        testID="affix-type-checkbox"
      />

      <Body>
        <KeyValuePair
          header={t(`${affixType}.DisplayName`)}
          subheader={t('Sample', {
            baseForm: t(`${affixType}.SampleBaseForm`),
            inflectedForm: t(`${affixType}.SampleInflectedForm`)
          })}
        />
      </Body>
    </ListItem>
  );

  const renderAffixTypeList = () => {
    if (affixTypes.length === 0) {
      if (emptyMessage) {
        return (
          <Text
            style={styles.errorMessage}
            testID="empty-message-text"
          >
            {emptyMessage}
          </Text>
        );
      }

      return (
        <Spinner
          color="green"
          testID="loading-spinner"
        />
      );
    }

    return (
      <FlatList
        data={filteredAffixTypes}
        renderItem={renderAffixType}
        keyExtractor={affixType => affixType}
      />
    );
  };

  return (
    <>
      <Item
        rounded
        style={styles.filterInput}
      >
        <Input
          placeholder={t('filter.Label')}
          autoCapitalize="none"
          autoCorrect={false}
          value={affixTypeFilterString}
          onChangeText={setAffixTypeFilterString}
          testID="filter-text-input"
        />
      </Item>

      {
        renderAffixTypeList()
      }
    </>
  );
}

AffixTypeList.propTypes = {
  affixTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  emptyMessage: PropTypes.string,
  selectedAffixTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectedAffixTypesChanged: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  filterInput: {
    marginBottom: 5
  },
  errorMessage: {
    marginTop: 50,
    textAlign: 'center'
  }
});
