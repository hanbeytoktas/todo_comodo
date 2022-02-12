import 'react-perfect-scrollbar/dist/css/styles.css';
import {useNavigate, useRoutes} from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import React, {useEffect} from 'react';
import { I18nextProvider } from 'react-i18next';
import { ConfirmProvider } from './components/confirm';
import { Toaster } from 'react-hot-toast';
import  i18n from './modules/i18n';
import ScrollToTop from './components/ScrollToTop';


const App = () => {

  const content = useRoutes(routes);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('access_token')!=null){
      navigate("/app/dashboard")

    }else{
      navigate("/login")
    }
  }, []);

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
            <ScrollToTop />
            <Toaster />
            {content}
          </ConfirmProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </I18nextProvider>
  );
};

export default App;
