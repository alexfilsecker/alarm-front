import { CssBaseline } from '@mui/material';
import '../styles/global.css';
import { Provider } from 'react-redux';

import Layout from '../components/Layout';
import store from '../redux/store';

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
