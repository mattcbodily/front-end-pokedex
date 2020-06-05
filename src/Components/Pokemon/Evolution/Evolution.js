import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Evolution.css';

export default props => {
    let [evolutionChain, setEvolutionChain] = useState([]);

    const getEvolutionChain = async() => {
        const {id} = props.match.params,
              pokeSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
              spriteObj = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        let chain = await axios.get(pokeSpecies.data.evolution_chain.url),
            chainData = [];

        chainData.push(spriteObj.data);

        if(props.name === 'Eevee'){
            for(let i = 0; i <= 2; i++){
                let splitStr = chain.data.chain.evolves_to[i].species.url.split('/'),
                    pokeId = splitStr[splitStr.length - 2];
                let species = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
                chainData.push(species.data)
            }
        } else if(chain.data.chain.evolves_to.length){
            const {evolves_to} = chain.data.chain;
            let splitStr = evolves_to[0].species.url.split('/'),
                pokeId = splitStr[splitStr.length - 2],
                species = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
                
            chainData.push(species.data);
            if(evolves_to[0].evolves_to.length){
                let splitStrTwo = evolves_to[0].evolves_to[0].species.url.split('/'),
                    pokeIdTwo = splitStrTwo[splitStrTwo.length - 2],
                    speciesTwo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeIdTwo}`);

                chainData.push(speciesTwo.data)
            }
        }
        setEvolutionChain(chainData)
    }

    useEffect(() => {
        getEvolutionChain();
    }, [props.name])

    return (
        <div>
            {evolutionChain.map((pokemon, i) => (
                <div key={i}>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    <p>{pokemon.name}</p>
                </div>
            ))}
        </div>
    )
}