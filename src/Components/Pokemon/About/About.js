import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

export default props => {
    let [aboutInfo, setAboutInfo] = useState(''),
        [height, setHeight] = useState(''),
        [metricHeight, setMetricHeight] = useState(''),
        [weight, setWeight] = useState(0),
        [metricWeight, setMetricWeight] = useState(0);

    const getHeight = () => {
        let totalInches = Math.round(props.height * 3.94),
            feet = Math.floor(totalInches / 12),
            remInches = totalInches - (feet * 12);

        let centimeters = props.height * 10,
            meters;

        if (centimeters >= 100) {
            meters = centimeters / 100;
            setMetricHeight(`${meters}m`);
        } else {
            setMetricHeight(`${centimeters}cm`);
        }

        setHeight(`${feet}' ${remInches}"`);
    }

    const getWeight = () => {
        let pounds = props.weight / 4.536,
            trimNum = Number(pounds.toFixed(1));

        let kilograms = props.weight / 10;

        setWeight(trimNum);
        setMetricWeight(kilograms);
    }

    const getInfo = async () => {
        const { pokeId } = props;
        let flavorText = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`),
            enFlavorText = flavorText.data.flavor_text_entries.filter((text, i) => text.language.name === 'en');

        setAboutInfo(enFlavorText[0].flavor_text);
    }

    useEffect(() => {
        if(props.pokeId){
            getInfo();
            getHeight();
            getWeight();
        }
    }, [props])

    return (
        <div className='about'>
            <p>{aboutInfo}</p>
            <section className='height-weight'>
                <section>
                    <p className='size-prompt'>Height</p>
                    <p>{height} ({metricHeight})</p>
                </section>
                <section>
                    <p className='size-prompt'>Weight</p>
                    <p>{weight}lbs ({metricWeight}kg)</p>
                </section>
            </section>
        </div>
    )
}