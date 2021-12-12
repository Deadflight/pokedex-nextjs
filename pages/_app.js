import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/ui/createEmotionCache';
import { QueryProvider } from 'api/QueryProvider';
import { useServerStyles } from '@/ui/ssr';
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  useServerStyles()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Pokedex</title>
        <meta charSet="utf-8" key="charSet"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <link rel="preconnect" href="https://fonts.gstatic.com" key="font"></link>    
        <meta property='og:title' content='Pokedex'/>
        <meta property='og:image' content='https://github.com/Deadflight/pokedex-nextjs/tree/main/public/pokedex.PNG'/>
        <meta property='og:description' content='Pokedex using Next.js, i18n,React Query, Styled Components, PokeAPI, SSR, ISR, SSG, Material UI'/>
        <meta property='og:url' content='https://pokedex-nextjs-beta.vercel.app'/>
        <noscript id="mui-insertion-point" />
      </Head>
      <QueryProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </QueryProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default appWithI18Next(MyApp, ni18nConfig);
