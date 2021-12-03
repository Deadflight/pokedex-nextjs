import axios from 'axios'

// export const getPokemons = async (url, limit) => {
//   try {
//     let pokemonData = []
//     for(let i = 0; i < limit; i++){
//       const {data} = await axios.get(`${url}/${i+1}`)
//       pokemonData[i] = await data
//     }
//     return pokemonData
//   } catch (error) {
//     console.log(error)
//   }
// }

export const getPokemonsDetails = async (pokemons) => {
    try {
    let pokemonData = []
    pokemons.map(async (pokemon, i) => {
      const {data} = await axios.get(`${pokemon.url}`)
      pokemonData[i] = await data
    })
    return pokemonData
  } catch (error) {
    console.log(error)
  }
}