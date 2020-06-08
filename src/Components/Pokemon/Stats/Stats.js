import React, {useState, useEffect} from 'react';
import stringWorks from '../../../HOCs/stringWorks';
import './Stats.css';

const Stats = props => {
    let [formattedStats, setFormattedStats] = useState([]);

    const formatStrings = () => {
        let format = props.statsArr.map((stat) => {
            if(stat.stat.name === 'hp'){
                return {
                    name: stat.stat.name.toUpperCase(),
                    stat: stat.base_stat
                }
            } else if(stat.stat.name === 'special-attack' || stat.stat.name === 'special-defense'){
                return {
                    name: props.strWorks.removeHyphen(stat.stat.name),
                    stat: stat.base_stat
                }
            } else {
                return {
                    name: props.strWorks.capitalizeFirst(stat.stat.name),
                    stat: stat.base_stat
                }
            }
        })

        setFormattedStats(format)
    }

    useEffect(() => {
        if(props.statsArr){
            formatStrings()
        }
    }, [props])

    return (
        <div className='stats'>
            {formattedStats?.map((stat, i) => (
                <section key={i} className='stat-container'>
                    <p>{stat.name}</p>
                    <p>{stat.stat}</p>
                </section>
            ))}
        </div>
    )
}

export default stringWorks(Stats);