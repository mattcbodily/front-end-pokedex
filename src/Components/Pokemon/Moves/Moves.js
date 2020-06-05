import React from 'react';
import './Moves.css';

export default props => {
    console.log(props)
    return (
        <div>
            {props.moves?.map((move, i) => (
                <p key={i}>{move.move.name}</p>
            ))}
        </div>
    )
}