import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next';
import { QueryProvider } from 'api/QueryProvider';

function MyApp({ Component, pageProps }) {
  return (
    <QueryProvider >
      <Component {...pageProps} />
    </QueryProvider>
  )
}

export default appWithTranslation(MyApp)
