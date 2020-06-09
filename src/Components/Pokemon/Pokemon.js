import React, {useState, useEffect} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import axios from 'axios';
import stringWorks from '../../HOCs/stringWorks';
import Header from '../Header/Header';
import About from './About/About';
import Stats from './Stats/Stats';
import Evolution from './Evolution/Evolution';
import Moves from './Moves/Moves';
import dots from '../../assets/dots.svg';
import pokeball from '../../assets/pokeball.svg';
import './Pokemon.css';

const Pokemon = props => {
    let [pokemon, setPokemon] = useState({});

    const getPokemon = async() => {
        const {id} = props.match.params;

        let pokeObj = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if(pokeObj.data.name === 'mr-mime'){
            pokeObj.data.name = props.strWorks.removeHyphen(pokeObj.data.name)
        } else {
            pokeObj.data.name = props.strWorks.capitalizeFirst(pokeObj.data.name);
        }
        pokeObj.data.types = pokeObj.data.types.map(element => props.strWorks.capitalizeFirst(element.type.name))
        setPokemon(pokeObj.data);
    }

    useEffect(() => {
        getPokemon();
    }, [])

    console.log(pokemon)

    return (
        <div className='pokemon'>
            <Header />
            <section className='pokemon-intro-mobile'>
                <h1>{pokemon.name} #{pokemon.id}</h1>
                <div className='types-flex'>
                    {pokemon.types?.map((type, i) => (
                        <div key={i} className={'pokemon-intro-type'}>{type}</div>
                    ))}
                </div>
                <div className='square-style'></div>
                <img src={dots} alt='dots' className='dots'/>
                <img src={pokeball} alt='Pokeball Icon' className='poke-icon'/>
                <img src={pokemon.sprites?.front_default} alt={pokemon.name} className='pokemon-about-image'/>
            </section>
            <div className='poke-info-mobile'>
                <nav className='link-flex'>
                    <Link to={`/pokemon/${pokemon.id}`} className={`about-links ${props.location.pathname === ('/pokemon/' + pokemon.id) ? 'active-link' : null}`}>About</Link>
                    <Link to={`/pokemon/${pokemon.id}/stats`} className={`about-links ${props.location.pathname.includes('stats') ? 'active-link' : null}`}>Base Stats</Link>
                    <Link to={`/pokemon/${pokemon.id}/evolution`} className={`about-links ${props.location.pathname.includes('evolution') ? 'active-link' : null}`}>Evolution</Link>
                    <Link to={`/pokemon/${pokemon.id}/moves`} className={`about-links ${props.location.pathname.includes('moves') ? 'active-link' : null}`}>Moves</Link>
                </nav>
                <Switch>
                    <Route exact path='/pokemon/:id' render={() => <About {...props} height={pokemon.height} weight={pokemon.weight} pokeId={pokemon.id}/>}/>
                    <Route path='/pokemon/:id/stats' render={() => <Stats {...props} statsArr={pokemon.stats}/>}/>
                    <Route path='/pokemon/:id/evolution' render={() => <Evolution {...props} name={pokemon.name} pokeId={pokemon.id}/>}/>
                    <Route path='/pokemon/:id/moves' render={() => <Moves {...props} moves={pokemon.moves}/>}/>
                </Switch>
            </div>
            <section className='landing-desktop'>
                <section className='pokemon-intro-desktop'>
                    <h1>{pokemon.name} #{pokemon.id}</h1>
                    <div className='types-flex'>
                        {pokemon.types?.map((type, i) => (
                            <div key={i} className={'pokemon-intro-type'}>{type}</div>
                        ))}
                    </div>
                    <img src={pokemon.sprites?.front_default} alt={pokemon.name} className='pokemon-about-image'/>
                </section>
                <About height={pokemon.height} weight={pokemon.weight} pokeId={pokemon.id} />
                <Stats statsArr={pokemon.stats}/>
                <Moves moves={pokemon.moves}/>
                <Evolution name={pokemon.name} pokeId={pokemon.id} />
            </section>
        </div>
    )
}

export default stringWorks(Pokemon);