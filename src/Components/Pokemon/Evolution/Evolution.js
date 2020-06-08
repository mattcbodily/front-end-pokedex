import React, {useState, useEffect} from 'react';
import axios from 'axios';
import stringWorks from '../../../HOCs/stringWorks';
import './Evolution.css';

const Evolution = props => {
    let [evolutionChain, setEvolutionChain] = useState([]);

    const getEvolutionChain = async() => {
        const {id} = props.match.params,
              preEvolutions = ['Pikachu', 'Raichu', 'Clefairy', 'Clefable', 'Jigglypuff', 'Wigglytuff', 'Electabuzz', 'Magmar', 'Hitmonchan', 'Hitmonlee'],
              postEvolutions = ['Lickitung', 'Scyther', 'Onix', 'Magmar', 'Electabuzz', 'Tangela', 'Magnemite', 'Magneton', 'Horsea', 'Seadra'],
              pokeSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

        let chain = await axios.get(pokeSpecies.data.evolution_chain.url),
            chainData = [];
            
        if(!preEvolutions.includes(props.name)){
            let speciesSplit = chain.data.chain.species.url.split('/'),
            firstPokemonId = speciesSplit[speciesSplit.length - 2],
            firstPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${firstPokemonId}`);

            firstPokemon.data.name = props.strWorks.capitalizeFirst(firstPokemon.data.name);
            chainData.push(firstPokemon.data);
        }

        if(props.name === 'Eevee'){
            const {evolves_to} = chain.data.chain;
            for(let i = 0; i <= 2; i++){
                const {evolution_details} = evolves_to[i];

                let splitStr = evolves_to[i].species.url.split('/'),
                    pokeId = splitStr[splitStr.length - 2],
                    species = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);

                species.data.name = props.strWorks.capitalizeFirst(species.data.name);
                species.data.evolution = props.strWorks.removeHyphen(evolution_details[0].item.name);
                chainData.push(species.data)
            }
        } else if(chain.data.chain.evolves_to.length && !postEvolutions.includes(props.name)){
            const {evolves_to} = chain.data.chain,
                  {evolution_details} = evolves_to[0];

            let splitStr = evolves_to[0].species.url.split('/'),
                pokeId = splitStr[splitStr.length - 2],
                species = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);

            species.data.name = props.strWorks.capitalizeFirst(species.data.name);

            if(evolution_details[0].trigger.name === 'level-up' && props.name !== 'Pikachu' && props.name !== 'Clefairy' && props.name !== 'Jigglypuff'){
                species.data.evolution = `Lvl ${evolution_details[0].min_level}`;
            } else if(evolution_details[0].trigger.name === 'use-item'){
                species.data.evolution = props.strWorks.removeHyphen(evolution_details[0].item.name);
            } else if(evolution_details[0].trigger.name === 'trade'){
                species.data.evolution = 'Trade'
            }
                
            chainData.push(species.data);
            if(evolves_to[0].evolves_to.length){
                let splitStrTwo = evolves_to[0].evolves_to[0].species.url.split('/'),
                    pokeIdTwo = splitStrTwo[splitStrTwo.length - 2],
                    speciesTwo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeIdTwo}`);

                    speciesTwo.data.name = props.strWorks.capitalizeFirst(speciesTwo.data.name);

                    if(evolves_to[0].evolves_to[0].evolution_details[0].trigger.name === 'level-up'){
                        speciesTwo.data.evolution = `Lvl ${evolves_to[0].evolves_to[0].evolution_details[0].min_level}`;
                    } else if(evolves_to[0].evolves_to[0].evolution_details[0].trigger.name === 'use-item'){
                        speciesTwo.data.evolution = props.strWorks.removeHyphen(evolves_to[0].evolves_to[0].evolution_details[0].item.name);
                    } else if(evolves_to[0].evolves_to[0].evolution_details[0].trigger.name === 'trade'){
                        speciesTwo.data.evolution = 'Trade'
                    }

                chainData.push(speciesTwo.data)
            }
        }
        setEvolutionChain(chainData)
    }

    useEffect(() => {
        if(props.name){
            getEvolutionChain();
        }
    }, [props.name])

    return (
        <div className='evolution'>
            {evolutionChain.map((pokemon, i) => (
                <div key={i}>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    <p>{pokemon.name}</p>
                    {pokemon.evolution
                    ? <p>{pokemon.evolution}</p>
                    : null}
                </div>
            ))}
        </div>
    )
}

export default stringWorks(Evolution);