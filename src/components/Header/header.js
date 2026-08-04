import React from 'react';
import style from './header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SideNav from './SideNav/sideNav.js'
import { assetUrl } from '../../config';

const Header = (props) => {

    const logo = () => (
        <Link to="/" className={style.logo}>
            <img alt="NBA logo" src={assetUrl('images/nba_logo.png')} />
        </Link>
    )


    const navBars = () => (
        <div className={style.bars}>
            <FontAwesomeIcon icon="bars"
                onClick={props.onOpenNav}
                style={{
                    color: 'white',
                    padding: '10px',
                    cursor: 'pointer'
                }}
            />
        </div>
    )

    return (
        <header>
            <div className={style.header}>
                <SideNav {...props} />
                <div className={style.headerOpt}>
                    {navBars()}
                    {logo()}
                </div>
            </div>
        </header>
    )
}

export default Header;
