import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { ConfirmProvider } from './components/confirm';
import { Toaster } from 'react-hot-toast';
import i18n from './modules/i18n';
import Plugin1 from './pages/Plugin1'


const App = () => {

  return (
    <I18nextProvider i18n={i18n}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>          
          <ConfirmProvider
            defaultOptions={{
              confirmationButtonProps: { autoFocus: true }
            }}
          >
            <GlobalStyles />
            <Toaster />
            <Plugin1/>
          </ConfirmProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </I18nextProvider>
  );
};

export default App;
