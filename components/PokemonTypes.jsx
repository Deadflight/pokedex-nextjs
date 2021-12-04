import { Card, CardActions, CardContent, CardMedia, Container, Grid, Typography, CardActionArea, Box, Button, themeOptions } from "@/ui/index"
import { POKEMON_TYPES } from "@/constants/index";

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

export default PokemonTypes