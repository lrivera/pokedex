import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  pokemonsRequest: ['page'],
  pokemonsSuccess: ['payload', 'page'],
  pokemonsFailure: null,
  pokemonIdRequest: ['pokemonId'],
  setPokemon: ['pokemon','id'],
  pokemonIdFailure: null,
})

export const PokemonTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  data:[],
  dataObj:{},
  page:0,
  pokemonFetching:false,
  pokemonError:false
})

/* ------------- Selectors ------------- */

// export const PokemonSelectors = {
//   getData: state => state.data
// }

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state:any) => state.merge({ fetching: true })
export const requestPokemon = (state:any) => state.merge({ pokemonFetching: true })

// successful api lookup
type successActionType = {
  payload:{
    results:Array<any>,
  },
  page:number,
}
export const success = (state:any, action:successActionType) => {
  const { payload:{results=[]}={}, page=0 } = action
//   const newData = [...state.data, ...results]
  const newDataObj = results.reduce((prev, curr)=>{
      const pokeId = curr.url.replace('https://pokeapi.co/api/v2/pokemon/','').split('/')[0]
      const {[pokeId]:poke={}} = prev
      const newPoke = {
          ...poke,
          ...curr
      }
      return prev.merge({[pokeId]:newPoke})
  }, state.dataObj)
  console.log({newDataObj})
  return state.merge({
    fetching: false,
    error: null,
    // data: newData,
    page,
    dataObj: newDataObj
  })
}

// Something went wrong somewhere.
export const failure = (state:any) => state.merge({ fetching: false, error: true })

type setPokemonByIdType = {
  pokemon:{},
  id:string
}
export const setPokemonById = (state:any, action:setPokemonByIdType) => {
    const { dataObj } = state
    
    const { pokemon, id } = action
    const {[id]:poke={}} = dataObj
    //   const newData = [...state.data, ...results]
    const newDataObj = dataObj.merge({
        [id]:{
            ...poke,
            ...pokemon,
            fetched:true
        }
    })
    return state.merge({
        pokemonFetching: false,
        pokemonError: null,
        dataObj: newDataObj
      })
}

export const failurePokemonById = (state:any) => state.merge({ pokemonFetching: false, pokemonError: true })
  
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POKEMONS_REQUEST]: request,
  [Types.POKEMONS_SUCCESS]: success,
  [Types.POKEMONS_FAILURE]: failure,
  [Types.POKEMON_ID_REQUEST]: requestPokemon,
  [Types.SET_POKEMON]: setPokemonById,
  [Types.POKEMON_ID_FAILURE]: failurePokemonById,
  
})
