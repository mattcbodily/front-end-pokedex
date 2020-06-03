import React, {useState, useEffect} from 'react';
import axios from 'axios';

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
        <div>
            <img src={pokemon.sprites?.front_default} alt={pokemon.name}/>
            <p>{pokemon.name}</p>
        </div>
    )
}