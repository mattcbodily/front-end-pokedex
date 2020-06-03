import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import pokeball from '../../assets/pokeball.svg';
import './Landing.css';

export default props => {
    let [pokemonArr, setPokemonArr] = useState([]);

    const getAllPokemon = async() => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=151`,
              res = await axios.get(url),
              data = res.data.results;

        const pokeList = data.map((e, i) => ({
            name: e.name,
            id: i + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
        }))

        setPokemonArr(pokeList);
    }

    useEffect(() => {
        getAllPokemon()
    }, [])

    return (
        <div className='landing'>
            {pokemonArr.map((pokemon, i) => (
                <Link to={`/pokemon/${pokemon.id}`} key={i} className='landing-link'>
                    <div className='bubble-style'></div>
                    <img src={pokemon.image} alt={pokemon.name} className='poke-image'/>
                    <p>{pokemon.name}</p>
                    <img src={pokeball} alt='pokeball' className='pokeball-icon'/>
                </Link>
            ))}
        </div>
    )
}