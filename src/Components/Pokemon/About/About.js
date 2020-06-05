import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './About.css';

export default props => {
    let [aboutInfo, setAboutInfo] = useState('');

    const getInfo = async() => {
        const {id} = props.match.params;
        let flavorText = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
            enFlavorText = flavorText.data.flavor_text_entries.filter((text, i) => text.language.name === 'en');

        setAboutInfo(enFlavorText[0].flavor_text);
    }

    useEffect(() => {
        getInfo();
    }, [])

    console.log(props)
    console.log(aboutInfo)

    return (
        <div>About</div>
    )
}