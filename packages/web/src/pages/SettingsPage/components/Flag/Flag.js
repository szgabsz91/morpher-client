import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

export default function Flag({ flagImage, languageName, onLanguageSelected }) {
    return (
        <IconButton
            color="primary"
            onClick={onLanguageSelected}
            data-testid="icon-button"
        >
            <img
                src={flagImage}
                alt={languageName}
                title={languageName}
                data-testid="image"
            />
        </IconButton>
    )
}

Flag.propTypes = {
    flagImage: PropTypes.string.isRequired,
    languageName: PropTypes.string.isRequired,
    onLanguageSelected: PropTypes.func.isRequired
};
