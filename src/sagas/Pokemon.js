import { put, call } from 'redux-saga/effects'

import PokemonActions from '../redux/Pokemon'
import { type Saga } from 'redux-saga';

type PokemonsRequestType = {
  page:number
}
type apiType = {
  getPokemons:(offset:number)=>any,
  getPokemonById:(pokemonId:string)=>any,
}
export function* getPokemons(api:apiType, action:PokemonsRequestType): Saga<void> {
  const { page=0 } = action
  try {
    const offset = 20*(page-1)
    const _pokemons = yield call(api.getPokemons, offset)
    const pokemons = _pokemons.data
    if (pokemons != null) {
      yield put(PokemonActions.pokemonsSuccess(pokemons, page))
    } else {
      yield put(PokemonActions.pokemonsFailure())
    }
  } catch (err) {
    yield put(PokemonActions.pokemonsFailure())
  }
}
type GetPokemonIdType = {
  pokemonId:string
}
export function* getPokemonId(api:apiType, action:GetPokemonIdType): Saga<void> {
    const { pokemonId } = action
    try {
      const _pokemon:{data:any} = yield call(api.getPokemonById, pokemonId)
      const pokemon = _pokemon.data
      if (pokemon != null) {
        yield put(PokemonActions.setPokemon(pokemon, pokemonId))
      } else {
        yield put(PokemonActions.pokemonIdFailure())
      }
    } catch (err) {
      yield put(PokemonActions.pokemonIdFailure())
    }
  }


