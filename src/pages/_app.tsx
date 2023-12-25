import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import '../styles/global.css';
import { Provider } from 'react-redux';
import store from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
