import Layout from '@/components/Layout';
import PokemonCollection from '@/components/PokemonCollection/PokemonCollection';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from 'ni18n.config';

export const getStaticProps = async({locale}) => {
  const i18Conf = await loadTranslations(ni18nConfig, locale)

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
