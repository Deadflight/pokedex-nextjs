import {Container, Grid, Button, themeOptions, CircularProgress } from "@/ui/index"
import React from "react";
import { useInfiniteQuery } from "react-query";
import { getPokemons } from "api/pokeApi";
import  PokemonCard from '@/components/PokemonCard'

const Pokemones = () => {
  const limitPerPage = 20;
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('pokemons', getPokemons, {
    getNextPageParam: (lastPage,pages) => {
      if(pages.length < lastPage.count ) {
        const nextPage = pages.length * limitPerPage
        return nextPage
      }else{
        return undefined
      }
    },
  })

  return status === 'loading' ? (
    <CircularProgress color="inherit" />
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    
    <>   

      {data?.pages?.map((group, i) => (        
        <React.Fragment key={i}>
          {group?.results?.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon}/>
          ))}
        </React.Fragment>
      ))}


      <Grid item>
      
        <Button sx={{
          backgroundColor: themeOptions.palette.primary.main, 
            ":hover": {
              backgroundColor: themeOptions.palette.primary.contrastText, 
              color: themeOptions.palette.primary.main 
            },
          }} 
          variant="contained"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Grid>
    </>
  )
}

const PokemonCollection = () => {
  return (
        <Grid container spacing={4} justifyContent="center" >
          <Pokemones/>
        </Grid>
  )    
}

export default PokemonCollection