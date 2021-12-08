import { CircularProgress, Grid, Typography, Button } from "@/ui/index"
import { getPokemons } from "api/pokeApi";
import  PokemonCard from '@/components/PokemonCard'
import React from "react";
import { useInfinitePokemonQuery } from "@/api/useInfinitePokemonQuery";
import FetchingButton from "@/components/FetchingButton";


const InfinitePokemons = () => {
  const {
    data,
    isError,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfinitePokemonQuery({fetchOption: getPokemons, queryKey: 'partialPokemons'})

  if(isLoading){
    return <p>Loading...</p>
  }

    if(isError){
    return <p>{error.message}</p>
  }
  return (
    <>
      <Grid container spacing={4} sx={{justifyContent: 'center'}}>
        {data?.pages?.map((pokemonList) => (

            pokemonList.map((pokemon) => (

                <PokemonCard key={pokemon.name} pokemon={pokemon}/>
              
            ))
          
        ))}
        <Grid item>
          <FetchingButton fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}/>
        </Grid>
      </Grid>
    </>
  )
}

export default InfinitePokemons