import React, {useState, useEffect} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import About from './About/About';
import Stats from './Stats/Stats';
import Evolution from './Evolution/Evolution';
import Moves from './Moves/Moves';
import './Pokemon.css';

export default props => {
    let [pokemon, setPokemon] = useState({});

    const getPokemon = () => {
        const {id} = props.match.params;
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => setPokemon(res.data))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getPokemon();
    }, [])

    return (
        <div className='pokemon'>
            <Header />
            <img src={pokemon.sprites?.front_default} alt={pokemon.name}/>
            <p>{pokemon.name}</p>
            <p>#{pokemon.id}</p>
            <div className='poke-info'>
                <nav className='link-flex'>
                    <Link to={`/pokemon/${pokemon.id}`} className={`about-links ${props.location.pathname === ('/pokemon/' + pokemon.id) ? 'active-link' : null}`}>About</Link>
                    <Link to={`/pokemon/${pokemon.id}/stats`} className={`about-links ${props.location.pathname.includes('stats') ? 'active-link' : null}`}>Base Stats</Link>
                    <Link to={`/pokemon/${pokemon.id}/evolution`} className={`about-links ${props.location.pathname.includes('evolution') ? 'active-link' : null}`}>Evolution</Link>
                    <Link to={`/pokemon/${pokemon.id}/moves`} className={`about-links ${props.location.pathname.includes('moves') ? 'active-link' : null}`}>Moves</Link>
                </nav>
                <Switch>
                <Route exact path='/pokemon/:id' component={About}/>
                <Route path='/pokemon/:id/stats' component={Stats}/>
                <Route path='/pokemon/:id/evolution' component={Evolution}/>
                <Route path='/pokemon/:id/moves' component={Moves}/>
                </Switch>
            </div>
        </div>
    )
}