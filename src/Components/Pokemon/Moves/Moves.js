import React, {useState, useEffect} from 'react';
import stringWorks from '../../../HOCs/stringWorks';
import './Moves.css';

const Moves = props => {
    let [levelMoves, setLevelMoves] = useState([]);

    const sortMoves = () => {
        let levelArr = props.moves?.filter(move => move.version_group_details[0].move_learn_method.name === 'level-up')
                                   .map(e => {
                                       return {
                                           name: props.strWorks.removeHyphen(e.move.name),
                                           level: e.version_group_details[0].level_learned_at
                                       }
                                   })
                                   .sort((a, b) => {
                                       return a.level - b.level
                                   });

        setLevelMoves(levelArr);
    }

    useEffect(() => {
        sortMoves();
    }, [props])

    return (
        <div className='moves'>
            {levelMoves?.map((move, i) => (
                <div key={i} className='move-container'>
                    <p>{move.name}</p>
                    <p>Lvl {move.level}</p>
                </div>
            ))}
        </div>
    )
}

export default stringWorks(Moves);