import { takeLatest, /*takeEvery,*/ all } from 'redux-saga/effects'
import { PokemonTypes } from '../redux/Pokemon'

import {
    getPokemons,
    getPokemonId
} from './Pokemon'

import API from '../api'

const api = API.create()

export default function* root() {
  yield all([
    takeLatest(PokemonTypes.POKEMONS_REQUEST, getPokemons, api),
    takeLatest(PokemonTypes.POKEMON_ID_REQUEST, getPokemonId, api),
    
  ])
}
