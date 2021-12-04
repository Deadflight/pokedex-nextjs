import Layout from '@/components/Layout';
import PokemonCollection from '@/components/PokemonCollection/PokemonCollection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const getStaticProps = async({locale}) => {
  const i18Conf = (await serverSideTranslations(locale, ['common', 'pokemonTypes']))

  return {
    props: {
      ...i18Conf,
    }
  }
}


export default function Home(){ 
  return (
    <Layout>
      <PokemonCollection/>
    </Layout>
  )
}
