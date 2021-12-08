import { Card, CardContent, CardMedia, Container, Grid, Typography, CardActionArea } from "@/ui/index"
import Link from 'next/link'
import Image from '@/components/Image'
import PokemonTypes from "@/components/PokemonTypes"
import { useEffect, useState } from "react";
import { getPokemonsDetails } from "@/api/pokeApi"

const PokemonCard =  ({pokemon}) => {
  const [pokemonData, setPokemonData] = useState({})
  const [isFetching, setIsFetching] = useState(true)
  useEffect(() => {
    setIsFetching(true)
    getPokemonsDetails(pokemon.url).then((res) => {
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
                    <Image src={pokemonData?.sprites?.front_default} alt={pokemonData?.name} layout="intrinsic" width={460} aspectRatio="4:3"/>
                  </CardMedia>
                  <CardContent>
                    <Typography align="center" gutterBottom variant="h5" component="div">
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