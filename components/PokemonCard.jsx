import { Card, CardActions, CardContent, CardMedia, Container, Grid, Typography, CardActionArea, Box, Button, themeOptions } from "@/ui/index"
import Link from 'next/link'
import Image from '@/components/Image'
import PokemonTypes from "@/components/PokemonTypes"
import { useEffect, useState } from "react";
import { getPokemonsDetails } from "@/api/pokeApi"


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

export default PokemonCard