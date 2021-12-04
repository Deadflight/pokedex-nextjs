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

export const getPokemons = async ({pageParam = 0, limit = 20}) => {
  try {
    const POKE_API_URL =  `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=${limit}`
    return await fetch(`${POKE_API_URL}`).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}

export const getPokemonsDetails = async (pokemon) => {
  try {
    const {data} = await axios.get(`${pokemon}`)
    return data
  } catch (error) {
    console.log(error)
  }
}