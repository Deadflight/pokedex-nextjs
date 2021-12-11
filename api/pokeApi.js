import axios from 'axios'

export const getAllPokemons = async ({pageParam = 0, limit = 1118}) => {
  try {
    const POKE_API_URL =  `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=${limit}`
    const { data } = await axios.get(`${POKE_API_URL}`)
    const { results } = data
    return results
  } catch (error) {
    console.log(error)
  }
}

export const getPokemons = async ({pageParam = 0, limit = 20}) => {
  try {
    const POKE_API_URL =  `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=${limit}`
    const { data } = await axios.get(`${POKE_API_URL}`)
    const { results } = data
    return results
  } catch (error) {
    console.log(error)
  }
}

export const getPokemon = async (pokemonId) => {
  try {
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    const { name, abilities, types, sprites, height, stats, id } = data
    return { name, abilities, types, sprites, height, stats, id }; 
  } catch (error) {
    console.log(error)
  }
}