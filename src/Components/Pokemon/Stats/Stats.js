import React, {useState, useEffect} from 'react';
import './Stats.css';

export default props => (
    <div>
        {props.statsArr?.map((stat, i) => (
            <section key={i}>
                <span>{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
            </section>
        ))}
    </div>
);