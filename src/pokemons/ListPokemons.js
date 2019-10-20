import React,{Component} from 'react';

import PokemonActions from '../redux/Pokemon'
import { connect } from 'react-redux'

import './ListPokemons.css';
import InfiniteScroll from 'react-infinite-scroller';
import {Zoom} from 'react-reveal';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {cap} from '../Utils'
import { Link } from "react-router-dom";

type OwnProps = {|
|}

type PropsType = {
  ...OwnProps,
  page: number,
  pokemons: {},
  getPokemons:(page:number)=>any,
}
class ListPokemons extends Component<PropsType, {}> {
    state={}
    // componentDidMount(){
    //     const {page} = this.props
    //     this.loadPokemons(page)
    // }
    loadPokemons = (page:number=0)=>{
      console.log({page})
      const {getPokemons} = this.props
      getPokemons(page)
    }
    render(){
        const {pokemons, page} = this.props
        // console.log({page})

        return (
            <Zoom left>
                <div className={'root'}>
                <InfiniteScroll
                    pageStart={page}
                    hasMore={true}
                    loadMore={this.loadPokemons}
                    initialLoad={true}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                  <List className={'list'}>
                    {Object.keys(pokemons).map((pKey)=>{
                      const pokemon = pokemons[pKey]
                      const {sprites={}} = pokemon
                      let img = null
                      const {front_default=null} = sprites
                      if(front_default !== null){
                        img = (
                          <ListItemAvatar>
                            <Avatar alt={pKey} src={front_default}/>    
                          </ListItemAvatar>
                        )
                      }
                      return (
                          <Link to={`/${pKey}`} key={pKey}>
                            <ListItem>
                              {img}
                              <ListItemText className='texts' primary={cap(pokemon.name)} secondary={`No: ${pKey}`} />
                            </ListItem>
                            <Divider component="li" />
                          </Link>
                      )
                    })}
                  </List>
                </InfiniteScroll>
                </div>
            </Zoom>
        );
    }
}

type ListStatePokemonsType = {
  pokemon:{
    dataObj:{},
    page:number
  }
}

const mapStateToProps = (state:ListStatePokemonsType) => ({
    pokemons: state.pokemon.dataObj,
    page: state.pokemon.page,
    // dataObj: state.pokemon.dataObj,
  })
  
  const mapDispatchToProps = (dispatch:(...args: Array<any>) => any) => ({
    getPokemons: (page:number) => dispatch(PokemonActions.pokemonsRequest(page))
  })
  
  
  const ListPokemonsContainer:any = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListPokemons)

export default ListPokemonsContainer