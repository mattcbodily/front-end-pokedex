import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
        <div>
            {pokemonArr.map((pokemon, i) => (
                <Link to={`/pokemon/${pokemon.id}`} key={i}>
                    <div>
                        <img src={pokemon.image} alt={pokemon.name}/>
                        <p>{pokemon.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}