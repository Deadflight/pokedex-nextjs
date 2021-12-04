import { Card, CardActions, CardContent, CardMedia, Container, Grid, Typography, CardActionArea, Box, Button, themeOptions } from "@/ui/index"
import Image from '@/components/Image'
import Link from 'next/link'
import { POKEMON_TYPES } from "@/constants/index";
import React, { useEffect, useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { getPokemonsDetails, getPokemons } from "api/pokeApi";
import axios from "axios";



const PokemonCard =  ({pokemon}) => {
  const [pokemonData, setPokemonData] = useState({
    name: '',
    sprites: {
      front_default: ''
    },
    id: 0,
    types: []
  })
  const [isFetching, setIsFetching] = useState(true)
  useEffect(() => {
    setIsFetching(true)
    getPokemonsDetails(pokemon).then((res) => {
      setPokemonData(res)     
      setIsFetching(false)
    });
  }, [pokemon])

  return (
    <>
      {isFetching
      ? <p>Cargando</p>
      : 
          <Grid item key={pokemonData?.name} xs={12} sm={6} md={3}>
            <Link href={`/pokemon-detail/${pokemonData?.id}`} passHref>
              <Card sx={{height:'100%', display: 'flex', flexDirection: 'column', backgroundColor:'#EEEEEE'}}>
                <CardActionArea>
                  <CardMedia>
                    <Image src={pokemonData?.sprites?.front_default} alt={pokemonData?.name} layout="intrinsic" width={460} aspectRatio="4:3"/>
                  </CardMedia>
                  <CardContent>
                    <Typography align="center" gutterBottom variant="h5" component="div">
                      {pokemonData?.name[0].toUpperCase() + pokemonData?.name.slice(1)}
                    </Typography>
                    <PokemonTypes pokemonTypes={pokemonData?.types}/>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>

      }

    </>
  )
}

const PokemonTypes = ({pokemonTypes}) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {pokemonTypes.map((types) => (
        <Grid item xs={12} sm={6} key={types.type.name}>
          <Box sx={{ backgroundColor: POKEMON_TYPES[types.type.name], borderRadius: 1 }}>
            <Typography  align="center" gutterBottom variant="body1">
              {types.type.name[0].toUpperCase() + types.type.name.slice(1)}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}



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
        <Grid container spacing={4}>
          <Pokemones/>
        </Grid>
    </Container>
  )    
}

export default PokemonCollection