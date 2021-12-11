import Layout from "@/components/Layout"
import PokemonCard from "@/components/PokemonCard"
import { Grid, Container, SearchIcon, Typography, CircularProgress, Button, themeOptions, Box } from "@/ui/index.js"
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import React, { useEffect, useState } from "react"
import get from 'lodash/get'
import { useInfinitePokemonQuery } from "@/api/useInfinitePokemonQuery"
import FetchingButton from "@/components/FetchingButton"
import { getAllPokemons } from "@/api/pokeApi"
import { debounce } from "lodash"
import { useTranslation } from "react-i18next"
import { loadTranslations } from "ni18n"
import { ni18nConfig } from "ni18n.config"

export const getStaticProps = async({locale}) => {
  const i18Conf = await loadTranslations(ni18nConfig, locale, ['search-page'])

  return {
    props: {
      ...i18Conf,
    }
  }
}
  

const Search = () => {
  const [term, setTerm] = useState('')
  const { t } = useTranslation(['search-page'])

  const searchTerm = useDebounce(term.toLowerCase().trim(), 500)

  const updateTerm = async (event) => {
    setTerm(event.currentTarget.value)
  }
  
  const {
    data,
    status,
  } = useInfinitePokemonQuery({fetchOption: getAllPokemons, queryKey: 'searchPokemon'})

  let result = []
  data?.pages?.map((pokemonList) => {
    result = pokemonList.filter((pokemon) => 
      pokemon.name.includes(searchTerm) && searchTerm !== ""
    ) 
  })

  const emptyResults = status !== 'success' || get(data, 'pages.length', 0) === 0 || searchTerm === ""

  return (
    <Layout>
      <Grid container spacing={4} sx={{justifyContent: 'center'}}> 
        <Grid item xs={12}>
          <Typography variant="h4" align="center" >{t('searchPokemon')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth   variant="outlined">
                <OutlinedInput
                  id="search-term-field"
                  value={term}
                  onChange={updateTerm}
                  placeholder={t('searchInput')}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
          </FormControl>
        </Grid>
        <Grid item xs={12}>

        </Grid>

        {   
          !result.length < 1 && !emptyResults
            ? result.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon}/>
            ))
            : searchTerm !== ""
              ? (
                <Grid item>
                  <Typography variant="body1">{t('notFound', {term})}</Typography>
                </Grid>
              )
              
              : null
        }
      </Grid>
    </Layout>
  )
}

function useDebounce(value, wait = 0) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Update the inner state after <wait> ms
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, wait)

    // Clear timeout in case a new value is received
    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [value])
  return debouncedValue
}

export default Search
