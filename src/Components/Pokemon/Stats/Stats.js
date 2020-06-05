import React, {useState, useEffect} from 'react';
import stringWorks from '../../../HOCs/stringWorks';
import './Stats.css';

const Stats = props => {
    let [formattedStats, setFormattedStats] = useState([]);

    const formatStrings = () => {
        let format = props.statsArr.map((stat) => {
            if(stat.stat.name === 'hp'){
                stat.stat.name = stat.stat.name.toUpperCase();
            }
        })

        setFormattedStats(format)
    }

    useEffect(() => {
        if(props.statsArr){
            formatStrings()
        }
    }, [props])

    console.log(formattedStats)

    return (
        <div>
            {props.statsArr?.map((stat, i) => (
                <section key={i}>
                    <p>{stat.stat.name}</p>
                    <p>{stat.base_stat}</p>
                </section>
            ))}
        </div>
    )
}

export default stringWorks(Stats);