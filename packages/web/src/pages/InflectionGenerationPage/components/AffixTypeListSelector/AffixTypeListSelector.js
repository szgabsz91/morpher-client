import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import AffixTypeList from '../AffixTypeList/AffixTypeList';

export default function AffixTypeListSelector({ affixTypes, value, error = false, name, handleChange, setFieldTouched }) {
    const selectedAffixTypes = value;
    const unselectedAffixTypes = affixTypes.filter(affixType => !value.includes(affixType));

    const setSelectedAffixTypes = affixTypes => {
        handleChange({
            target: {
                id: name,
                value: affixTypes
            }
        });
        setFieldTouched(name, true, false);
    }

    const selectAffixType = affixType => {
        const newSelectedAffixTypes = [
            ...selectedAffixTypes,
            affixType
        ];
        setSelectedAffixTypes(newSelectedAffixTypes);
    };

    const unselectAffixType = affixType => {
        const newSelectedAffixTypes = selectedAffixTypes.filter(selectedAffixType => affixType !== selectedAffixType);
        setSelectedAffixTypes(newSelectedAffixTypes);
    };

    return (
        <Grid
            container
            spacing={2}
            data-testid="grid"
        >
            <Grid
                item
                xs={6}
            >
                <AffixTypeList
                    affixTypes={unselectedAffixTypes}
                    showFilter
                    error={error}
                    onAffixTypeClicked={selectAffixType}
                />
            </Grid>

            <Grid
                item
                xs={6}
            >
                <AffixTypeList
                    affixTypes={selectedAffixTypes}
                    error={error}
                    onAffixTypeClicked={unselectAffixType}
                />
            </Grid>
        </Grid>
    );
}

AffixTypeListSelector.propTypes = {
    affixTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    error: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired
};
