import { CssBaseline } from '@mui/material'
import Head from 'next/Head'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'


const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <noscript id="mui-insertion-point" />
      </Head>
      <CssBaseline/>
      <Header/>
        {children}
      <Footer/>
    </>
  )
}

export default Layout