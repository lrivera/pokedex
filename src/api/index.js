import apisauce from 'apisauce'

const create = (baseURL:string = 'https://pokeapi.co/api/v2') => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000
  })

  // GET CALLS
  const getPokemons = (offset:number=0, limit:number=20) => api.get(`/pokemon?offset=${offset}&limit=${limit}`)
  const getPokemonById = (pokemonId:string) => api.get(`/pokemon/${pokemonId}`)
  
  return {
    getPokemons,
    getPokemonById,
  }
}

export default {
  create
}
