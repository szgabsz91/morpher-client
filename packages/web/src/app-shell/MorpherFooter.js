import React from 'react';
import { useTranslation } from 'react-i18next';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function MorpherFooter() {
    const [t] = useTranslation('application');

    return (
        <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            data-testid="copyright"
        >
            {'© '}
            <Link
                href="https://github.com/szgabsz91"
                target="_blank"
                data-testid="link"
            >
                {t('AuthorName')}
            </Link>
            {' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

MorpherFooter.propTypes = {};
