import {Grid, Typography, Box } from "@/ui/index"
import { POKEMON_TYPES } from "@/constants/index";
import { useTranslation } from "react-i18next";

const PokemonTypes = ({pokemonTypes}) => {
  const { t } = useTranslation(['pokemonTypes'])

  return (
    <Grid container spacing={2} sx={{justifyContent: 'center'}}>
      {pokemonTypes.map((types) => (
        <Grid item xs={12} sm={6} key={types.type.name}>
          <Box sx={{ backgroundColor: POKEMON_TYPES[types.type.name], borderRadius: 1 }}>
            <Typography  align="center" gutterBottom variant="body1">
              {t(types.type.name)}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default PokemonTypes