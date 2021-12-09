import { Card, CardContent, CardMedia, Container, Grid, Typography, CardActionArea } from "@/ui/index"
import Link from 'next/link'
import Image from '@/components/Image'
import PokemonTypes from "@/components/PokemonTypes"
import { useEffect, useState } from "react";
import { getPokemon } from "@/api/pokeApi"
import { POKEMON_TYPES } from "@/constants/index";

const PokemonCard =  ({pokemon}) => {
  const [pokemonData, setPokemonData] = useState({})
  const [isFetching, setIsFetching] = useState(true)
  useEffect(() => {
    setIsFetching(true)
    getPokemon(pokemon.url.slice(34,-1)).then((res) => {
      setPokemonData(res)     
      setIsFetching(false)
    });
  }, [pokemon])

  return (
    <>
      {isFetching
      ? null
      : 
          <Grid item xs={12} sm={6} md={3}>
            <Link href={`/pokemon-detail/${pokemonData?.id}`} passHref>
              <Card sx={{height:'100%', display: 'flex', flexDirection: 'column', background: `linear-gradient(0deg, #e6e6e6 0%, rgba(58,57,61,0) 20%)` }}>
                <CardActionArea>
                  <CardMedia>
                    <Image src={pokemonData?.sprite} alt={pokemonData?.name} layout="intrinsic" width={460} aspectRatio="4:3"/>
                  </CardMedia>
                  <CardContent>
                    <Typography align="center" sx={{color: `${POKEMON_TYPES[pokemonData.types[0].type.name]}`}} gutterBottom variant="h5" component="div">
                      {pokemonData?.name[0]?.toUpperCase() + pokemonData?.name?.slice(1)}
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

export default PokemonCard