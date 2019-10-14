import { put, call } from 'redux-saga/effects'

import PokemonActions from '../redux/Pokemon'

export function* getPokemons(api, action) {
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

export function* getPokemonId(api, action) {
    const { pokemonId } = action
    try {
      const _pokemon = yield call(api.getPokemonById, pokemonId)
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


