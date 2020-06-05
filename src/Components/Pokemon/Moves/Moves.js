import React, {useState, useEffect} from 'react';
import './Moves.css';

export default props => {
    let [levelMoves, setLevelMoves] = useState([]),
        [machineMoves, setMachineMoves] = useState([]);
    console.log(props)

    const sortMoves = () => {
        let levelArr = props.moves?.filter(move => move.version_group_details[0].move_learn_method.name === 'level-up'),
            machineArr = props.moves?.filter(move => move.version_group_details[0].move_learn_method.name === 'machine');

        setLevelMoves(levelArr);
        setMachineMoves(machineArr);
    }

    useEffect(() => {
        sortMoves();
    }, [props])

    return (
        <div>
            <p>Learned By Level</p>
            {levelMoves?.map((move, i) => (
                <p key={i}>{move.move.name}</p>
            ))}
            <p>Learned by TM/HM</p>
            {machineMoves?.map((move, i) => (
                <p key={i}>{move.move.name}</p>
            ))}
        </div>
    )
}