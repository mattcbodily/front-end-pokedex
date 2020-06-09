import React from 'react';
import {Link} from 'react-router-dom';
import arrow from '../../assets/arrow-left.svg';
import arrowDark from '../../assets/arrow-left-dark.svg';
import './Header.css';

export default props => (
    <div className='header-flex'>
        <Link to='/'>
            <img src={arrow} alt='Back Arrow' className='mobile-arrow'/>
            <img src={arrowDark} alt='Back Arrow' className='desktop-arrow'/>
        </Link>
    </div>
)