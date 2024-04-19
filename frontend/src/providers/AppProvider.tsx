import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { ErrorBoundary } from 'react-error-boundary';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Loading } from '@/components/Loading';

type AppProviderProps = {
  children: React.ReactNode;
};

const theme = createTheme({
  palette: {
    background: {
      default: '#fdfdfd',
    },
  },
  typography: {
    fontFamily: [
      'Oswald',
      'sans-serif',
    ].join(','),
  },
});

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={ <Loading /> } >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {children}
        </Router>
      </ThemeProvider>
    </Suspense>
  );
};
