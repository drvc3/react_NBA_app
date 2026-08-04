import React from 'react';
import styles from '../articles.css';
import { assetUrl } from '../../../config';

const teamInfo = (props) => (
    <div className={styles.articleTeamHeader}>
        <div className={styles.left}
            style={{
                background: `url('${assetUrl(`images/teams/${props.team.logo}`)}')`
            }}
        ></div>
        <div className={styles.right}>
            <div>
                <span>{props.team.city} {props.team.name}</span>
            </div>
            <div>
                <strong>
                    W{props.team.stats[0].wins}-L{props.team.stats[0].defeats}
                </strong>
            </div>
        </div>
    </div>
)

export default teamInfo;
