import { CssBaseline } from "@mui/material";
import "../styles/global.css";
import { Provider } from "react-redux";

import store from "../redux/store";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps): React.ReactNode => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
