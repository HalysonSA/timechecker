import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../components/redux/storage';
import '../styles/globals.css';
export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>Weather App</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta
                    name="description"
                    content="Weather App, você pode consultar a temperatura de sua localidade."
                />
                <meta name="keywords" content="Weather, App" />
                <meta name="author" content="Halyson" />
            </Head>
            <Component {...pageProps} />
        </Provider>
    );
}
