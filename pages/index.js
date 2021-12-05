import Layout from '@/components/Layout';
import PokemonCollection from '@/components/PokemonCollection/PokemonCollection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../next-i18next.config';


export const getStaticProps = async({locale}) => {
  const i18Conf = await serverSideTranslations(locale, ['common', 'pokemonTypes'], nextI18nextConfig)

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
