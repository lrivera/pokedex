// @flow
import React, { useState } from 'react';
import {
    useParams,
    useHistory
  } from "react-router-dom";
import PokemonActions from '../redux/Pokemon'

import { connect } from 'react-redux'
import {Bounce, Flip} from 'react-reveal';

import Dialog from '@material-ui/core/Dialog';
import './Detail.css';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {cap} from '../Utils'

const Detail = ({getPokemonsById, pokemons={}}) => {
    const { pokemonId } = useParams();
    const history = useHistory();

    const [imageProp, setImageProp] = useState('front_default');

    const {[pokemonId]:poke={}} = pokemons
    let card = null
    const {fetched=false} = poke

    let img = null
    let data = []
    if (!fetched) {
        getPokemonsById(pokemonId)
        card = (
            <Card className='card'>
                <CardHeader
                    title={pokemonId}
                    subheader={'loading...'}
                />
            </Card>
            )
    }else{
        const audio = new Audio(`https://pokemoncries.com/cries-old/${pokemonId}.mp3`)
        audio.play()
        const {sprites={}, stats=[]} = poke
        const {[imageProp]:urlImg=null} = sprites
        if(urlImg !== null){
            img = (
                <Flip>
                    <CardMedia
                            className='media'
                            image={urlImg}
                            title={poke.name}
                        />
                </Flip>
            )
        }

        data = stats.map(({base_stat=0, effort=0, stat={}})=>{
            return {
                "stat": stat.name,
                base_stat,
                effort
            }
        })

        const spritesImgs = Object.keys(poke.sprites).map((pkey)=>{
                    let img =null, spr = poke.sprites[pkey]
                    if(spr!==null){
                        img = <img onClick={()=>setImageProp(pkey)} key={pkey} alt={pkey} src={spr} className={'avatar'} />    
                    }
                    return img
                })
        card = (
            <Bounce right>
                <Card className='card'>
                    <CardHeader
                        title={pokemonId}
                        subheader={cap(poke.name)}
                    />
                    {img}
                    <CardContent>
                        {spritesImgs}
                    </CardContent>
                    <RadarChart outerRadius={90} width={600} height={250} data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="stat" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        <Radar name="Stat" dataKey="base_stat" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Radar name="Effort" dataKey="effort" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Legend />
                    </RadarChart>
                </Card>
            </Bounce>
        )
    }
    return (
        <Dialog onClose={()=>history.push('/')} aria-labelledby="simple-dialog-title" open={true}>
            {card}
        </Dialog>
    )
}

const mapStateToProps = state => ({
    pokemons: state.pokemon.dataObj,
})
  
const mapDispatchToProps = dispatch => ({
    getPokemonsById: (pokemonID) => dispatch(PokemonActions.pokemonIdRequest(pokemonID))
})
  
  
  let DetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Detail)
export default DetailContainer