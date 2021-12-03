import { Card, CardActions, CardContent, CardMedia, Container, Grid, Typography, CardActionArea, Box } from "@/ui/index"
import Image from '@/components/Image'
import Link from 'next/link'
import { POKEMON_TYPES } from "@/constants/index";
import React, { useEffect, useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { getPokemonsDetails, getPokemons } from "api/pokeApi";
import axios from "axios";



const PokemonCard =  ({pokemons}) => {
  console.log(pokemons)
  const [pokemonData, setPokemonData] = useState([])
  useEffect(() => {
    getPokemonsDetails(pokemons).then((res) => {
      let newPokemonData = res
      setPokemonData(newPokemonData)
    });
    console.log(pokemonData)
  }, [pokemons])

  

  return (
    <>
      <Grid container spacing={4}>
        {pokemonData.map((pokemon) => (
          <Grid item key={pokemon.name} xs={12} sm={6} md={4}>
            <Link href={`/pokemon-detail/${pokemon.id}`} passHref>
              <Card sx={{height:'100%', display: 'flex', flexDirection: 'column', backgroundColor:'#EEEEEE'}}>
                <CardActionArea>
                  <CardMedia>
                    <Image src={pokemon.sprites.front_default} alt={pokemon.name} layout="intrinsic" width={460} aspectRatio="4:3"/>
                  </CardMedia>
                  <CardContent>
                    <Typography align="center" gutterBottom variant="h5" component="div">
                      {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                    </Typography>
                    <PokemonTypes pokemonTypes={pokemon.types}/>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
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

    isFetching,

    isFetchingNextPage,

    status,

  } = useInfiniteQuery(['pokemons'], fetchPokemons, {
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

      {data.pages.map((group, i) => (
        
      <React.Fragment key={i}>
        <PokemonCard pokemons={group.results}/>



      </React.Fragment>

      ))}  
      

      <div>

        <button

          onClick={() => fetchNextPage()}

          disabled={!hasNextPage || isFetchingNextPage}

        >

          {isFetchingNextPage

            ? 'Loading more...'

            : hasNextPage

            ? 'Load More'

            : 'Nothing more to load'}

        </button>

      </div>

      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>

    </>

  )

}

const PokemonCollection = () => {
  return (

    <Container sx={{ py: 8}} maxWidth="lg">
        {/* <Pokemones pokemonData={pokemonData}/> */}
        <Pokemones/>
    </Container>
  )    
}

export default PokemonCollection