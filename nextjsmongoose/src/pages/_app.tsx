
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
