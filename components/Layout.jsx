import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { Container } from '@/ui/index'

const Layout = ({children}) => {
  return (
    <>
      <Header/>
        <Container sx={{ py: 8, minHeight: '100vh' }} maxWidth="lg">
          {children}
        </Container>
      <Footer/>
    </>
  )
}

export default Layout