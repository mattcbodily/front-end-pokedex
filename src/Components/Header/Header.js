import React from 'react';
import {Link} from 'react-router-dom';
import arrow from '../../assets/arrow-left.svg';
import './Header.css';

export default props => (
    <div className='header-flex'>
        <Link to='/'>
            <img src={arrow} alt='Back Arrow'/>
        </Link>
    </div>
)