import Layout from '@/components/Layout';
import PokemonCollection from '@/components/PokemonCollection/PokemonCollection';
import { getPokemons } from 'api/pokeApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

export const getStaticProps = async({locale}) => {
  const i18Conf = await serverSideTranslations(locale)

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
