import axios from 'axios'

export const getAllPokemons = async ({pageParam= 0, limit = 1118}) => {
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

export const getPokemonsDetails = async (pokemon) => {
  try {
    const {data} = await axios.get(`${pokemon}`)
    return data
  } catch (error) {
    console.log(error)
  }
}