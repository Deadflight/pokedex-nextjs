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

export const getPokemonsDetails = async (pokemon) => {
  try {
    const {data} = await axios.get(`${pokemon}`)
    return data
  } catch (error) {
    console.log(error)
  }
}