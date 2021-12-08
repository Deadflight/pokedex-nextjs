import { Grid } from "@/ui/index"
import React from "react";
import InfinitePokemons from "@/components/InfinitePokemons";

const PokemonCollection = () => {
  return (
        <Grid container spacing={4} sx={{justifyContent: 'center'}}>
          <InfinitePokemons/>
        </Grid>
  )    
}

export default PokemonCollection