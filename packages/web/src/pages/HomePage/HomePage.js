import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';

import morpherLogo from '@szg/morpher-client-shared/assets/morpher.png';

export default function HomePage() {
    const [t] = useTranslation('home');
    const classes = useStyles();

    return (
        <>
            <h2
                className={classes.title}
                data-testid="page-title"
            >
                <img
                    src={morpherLogo}
                    alt={t('Title')}
                    title={t('Title')}
                    data-testid="application-logo"
                />
            </h2>

            <p data-testid="paragraph1">{t('Paragraph1')}</p>

            <p data-testid="paragraph2">{t('Paragraph2')}</p>

            <p data-testid="paragraph3">{t('Resources')}</p>

            <ul>
                <li>
                    <Link
                        href="https://github.com/szgabsz91/morpher"
                        target="_blank"
                        data-testid="morpher-link"
                    >
                        {t('application:Title')}
                    </Link>
                </li>
                <li>
                    <Link
                        href="https://github.com/szgabsz91/morpher-api"
                        target="_blank"
                        data-testid="morpher-api-link"
                    >
                        {t('MorpherAPI')}
                    </Link>
                </li>
                <li>
                    <Link
                        href="https://github.com/szgabsz91/morpher-client"
                        target="_blank"
                        data-testid="morpher-client-link"
                    >
                        {t('MorpherClient')}
                    </Link>
                </li>
            </ul>
        </>
    )
}

HomePage.propTypes = {};

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center'
    }
}));
