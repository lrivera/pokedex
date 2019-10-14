import React,{Component} from 'react';
import './Content.css';
import ListPokemons from './ListPokemons'
import {
  Route
} from "react-router-dom";
import Detail from './Detail'
class Content extends Component {
    state={}
    render(){
        return ( 
          <>
          <Route path="/:pokemonId">
            <Detail />
          </Route>
          <Route path="/">
            <ListPokemons />
          </Route>
        </>
        );
    }
}

export default Content