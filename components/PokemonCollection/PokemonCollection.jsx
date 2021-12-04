import { Card, CardActions, CardContent, CardMedia, Container, Grid, Typography, CardActionArea, Box, Button, themeOptions } from "@/ui/index"
import Image from '@/components/Image'
import Link from 'next/link'
import { POKEMON_TYPES } from "@/constants/index";
import React, { useEffect, useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { getPokemonsDetails, getPokemons } from "api/pokeApi";
import axios from "axios";
import  PokemonCard from '@/components/PokemonCard'

const fetchPokemons = async ({pageParam = 0}) => {
  const POKE_API_URL =  `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=20`
  return await fetch(`${POKE_API_URL}`).then((res) => res.json())
}

const Pokemones = () => {
  const limitPerPage = 20;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('pokemons', fetchPokemons, {
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
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    
    <>   

      {data?.pages?.map((group, i) => (        
        <React.Fragment key={i}>
          {group?.results?.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon.url}/>
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

    <Container sx={{ py: 8}} maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" >
          <Pokemones/>
        </Grid>
    </Container>
  )    
}

export default PokemonCollection