import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

export default function AffixTypeList({ affixTypes, showFilter = false, error = false, onAffixTypeClicked }) {
    const classes = useStyles();
    const [t] = useTranslation('affixTypes');
    const [affixTypeFilterString, setAffixTypeFilterString] = useState('');

    const filterAffixType = (affixType) => {
        const searchStrings = [
            affixType.toLowerCase(),
            t(`${affixType}.DisplayName`).toLowerCase(),
            t('Sample', {
                baseForm: t(`${affixType}.SampleBaseForm`),
                inflectedForm: t(`${affixType}.SampleInflectedForm`)
            })
        ];
        return searchStrings.some(searchString => searchString.includes(affixTypeFilterString.toLowerCase()));
    }

    const filteredAffixTypes = affixTypes.filter(filterAffixType);

    const renderRow = ({ index, style }) => {
        const affixType = filteredAffixTypes[index];

        return (
            <ListItem
                key={affixType}
                role="listitem"
                button
                style={style}
                onClick={() => onAffixTypeClicked(affixType)}
                data-testid="affix-type"
            >
                <ListItemText
                    primary={t(`${affixType}.DisplayName`)}
                    secondary={t('Sample', {
                        baseForm: t(`${affixType}.SampleBaseForm`),
                        inflectedForm: t(`${affixType}.SampleInflectedForm`)
                    })}
                />
            </ListItem>
        );
    };

    return (
        <Card
            className={clsx(error && classes.error)}
            data-testid="card"
        >
            <CardHeader
                className={classes.cardHeader}
                title={
                    <div
                        className={classes.cardHeaderInternal}
                        data-testid="card-header-internal"
                    >
                        {
                            showFilter ?
                                <TextField
                                    autoComplete="off"
                                    label={t('filter.Label')}
                                    value={affixTypeFilterString}
                                    onChange={e => setAffixTypeFilterString(e.target.value)}
                                    className={classes.affixTypeFilter}
                                /> :
                                t('filter.SelectedAffixTypeText')
                        }
                    </div>
                }
                data-testid="card-header"
            />

            <Divider data-testid="divider" />

            <FixedSizeList
                height={300}
                width={310}
                itemSize={80}
                itemCount={filteredAffixTypes.length}
                role="list"
                data-testid="affix-type-list"
            >
                {renderRow}
            </FixedSizeList>
        </Card>
    );
}

AffixTypeList.propTypes = {
    affixTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    showFilter: PropTypes.bool,
    error: PropTypes.bool,
    onAffixTypeClicked: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
    cardHeader: {
        padding: theme.spacing(1, 2)
    },
    cardHeaderInternal: {
        height: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    affixTypeFilter: {
        width: '100%'
    },
    list: {
        width: 300,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto'
    },
    error: {
        border: '1px solid ' + red['500']
    },
    emptyMessage: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 4
    }
}));
