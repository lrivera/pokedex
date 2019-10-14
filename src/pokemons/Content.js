import React,{Component} from 'react';
import './Content.css';
import ListPokemons from './ListPokemons'
import {
  Route
} from "react-router-dom";
import Detail from './Detail'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
class Content extends Component {
    state={}
    render(){
        return ( 
          <>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6">
                POKEDEX
              </Typography>
            </Toolbar>
          </AppBar>
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