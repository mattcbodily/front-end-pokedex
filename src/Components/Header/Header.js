import React from 'react';
import {Link} from 'react';
import arrow from '../../assets/arrow-left.svg';
import './Header.css';

export default props => (
    <div className='header-flex'>
        <img src={arrow} alt='Back Arrow'/>
    </div>
)