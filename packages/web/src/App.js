import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ThemeProvider as MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';
import './i18n';
import './App.css';

import MorpherAppBar from './app-shell/MorpherAppBar';
import MorpherDrawer from './app-shell/MorpherDrawer';
import MorpherContent from './app-shell/MorpherContent';

export default function App() {
  const [t] = useTranslation('application');
  const classes = useStyles();
  const [isAppBarOpen, setAppBarOpen] = useState(true);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />

          <MorpherAppBar
            isAppBarOpen={isAppBarOpen}
            setAppBarOpen={setAppBarOpen}
            applicationTitle={t('Title')}
            toggleDrawerButtonLabel={t('toggleDrawerButton.Label')}
          />

          <MorpherDrawer
            isAppBarOpen={isAppBarOpen}
            setAppBarOpen={setAppBarOpen}
            menuItemLabels={{
              home: t('home:Title'),
              inflectionGeneration: t('inflectionGeneration:Title'),
              morphologicalAnalysis: t('morphologicalAnalysis:Title'),
              settings: t('settings:Title')
            }}
          />

          <MorpherContent />
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

App.propTypes = {};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100vw'
  }
}));
