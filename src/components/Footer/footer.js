import React from 'react';
import styles from './footer.css';
import { Link } from 'react-router-dom';

import { CURRENT_YEAR, assetUrl } from '../../config';

const footer = () => (
    <div className={styles.footer}>
        <Link to="/" className={styles.logo}>
            <img alt="NBA logo" src={assetUrl('images/nba_logo.png')} />
        </Link>
        <div className={styles.right}>
            @NBA {CURRENT_YEAR} All rights reserved.
        </div>
    </div>
)

export default footer;
