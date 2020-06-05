import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Evolution.css';

export default props => {
    let [evolutionChain, setEvolutionChain] = useState([]);

    const getEvolutionChain = async() => {
        const {id} = props.match.params,
              pokeSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

        let chain = await axios.get(pokeSpecies.data.evolution_chain.url);

        console.log(pokeSpecies)
        console.log(chain.data.chain)

        if(chain.data.chain.evolves_to.length){
            
        }
    }

    useEffect(() => {
        getEvolutionChain();
    }, [])

    return (
        <div>Evolution</div>
    )
}