import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Evolution.css';

export default props => {
    let [evolutionChain, setEvolutionChain] = useState([]);

    console.log(props)

    const getEvolutionChain = async() => {
        const {id} = props.match.params,
              pokeSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

        let chain = await axios.get(pokeSpecies.data.evolution_chain.url);

        console.log(pokeSpecies)
        console.log(chain.data.chain)

        let chainData = [];

        if(props.name === 'Eevee'){
            console.log('hit')
            for(let i = 0; i <= 2; i++){
                let splitStr = chain.data.chain.evolves_to[i].species.url.split('/'),
                    pokeId = splitStr[splitStr.length - 2];
                let species = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
                chainData.push(species.data)
            }
        } else if(chain.data.chain.evolves_to.length){
            
        } else {

        }
        setEvolutionChain(chainData)
    }

    useEffect(() => {
        getEvolutionChain();
    }, [props.name])

    return (
        <div>
            {evolutionChain.map((pokemon, i) => (
                <div>
                    <img key={i} src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    <p>{pokemon.name}</p>
                </div>
            ))}
        </div>
    )
}