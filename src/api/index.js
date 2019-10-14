import apisauce from 'apisauce'

const create = (baseURL = 'https://pokeapi.co/api/v2') => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000
  })

  // GET CALLS
  const getPokemons = (offset=0, limit=20) => api.get(`/pokemon?offset=${offset}&limit=${limit}`)
  const getPokemonById = (pokemonId) => api.get(`/pokemon/${pokemonId}`)
  
  return {
    getPokemons,
    getPokemonById,
  }
}

export default {
  create
}
