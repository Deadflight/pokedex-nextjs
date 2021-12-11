import { getAllPokemons, getPokemon } from "@/api/pokeApi"
import Layout from "@/components/Layout";
import { POKEMON_TYPES } from "@/constants/index";
import { Grid, Typography } from "@/ui/index";
import flatMap from 'lodash/flatMap'
import Image from '@/components/Image'
import PokemonTypes from "@/components/PokemonTypes";
import { loadTranslations } from "ni18n";
import { useTranslation } from "react-i18next";
import { ni18nConfig } from "../../ni18n.config"


export const getStaticProps = async ({params, locale}) => {
  const id = params?.id;

  if(typeof id !== 'string'){

    return{
      notFound: true  
    }
  }

  try {
    const pokemon = await getPokemon(id)
    const i18nConf = await loadTranslations(ni18nConfig, locale, ['pokemon-detail-page'])

    return{
      props: {
        pokemon,
        ...i18nConf
      },
      revalidate: 5 * 60, // once every five minutes
    }
    
  } catch (e) {
    return {
      notFound: true
    }
  }
}

export const getStaticPaths = async () => {

  const pokemonEntries = await getAllPokemons({pageParam: 0, limit: 20})

  

  const paths = flatMap(
    pokemonEntries.map((pokemon) => ({
      params: {
        id: pokemon.url.slice(34,-1)
      }
    }))
  )

  return{
    paths,

    // Block until the server gets its data. Like in Server side rendering
    fallback: 'blocking'
  }
}

const PokemonDetail = ({ pokemon }) => {

  const { t } = useTranslation(['pokemon-detail-page'])

  return (
    <Layout>
      <Grid container sx={{justifyContent: 'center'}}>
        <Grid item xs={12}>
          <Typography align="center" sx={{color: `${POKEMON_TYPES[pokemon?.types[0]?.type?.name]}`}} gutterBottom variant="h4">
            {pokemon?.name[0]?.toUpperCase() + pokemon?.name?.slice(1)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container sx={{justifyContent: 'center'}}>
            <Image src={pokemon?.sprites?.front_default || 'https://images.unsplash.com/photo-1542779283-429940ce8336'} alt={pokemon?.name} layout="intrinsic" width={460} aspectRatio="4:3"/>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={12}>
              <PokemonTypes pokemonTypes={pokemon?.types} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">{t('abilities')}:
                {
                  pokemon?.abilities?.map(({ability}) => (
                    ability?.name[0]?.toUpperCase() + ability?.name?.slice(1) + " "
                  ))
                }
              </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h6">
                    {t('height')}: {pokemon?.height}
                </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">Base Stats</Typography>
            </Grid>
            {
              pokemon?.stats?.map(({base_stat, stat}) => (
                <Grid item md={6} key={base_stat}>
                  <Typography variant="h6" >{t(`${stat?.name}`)}: {base_stat}</Typography>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default PokemonDetail
