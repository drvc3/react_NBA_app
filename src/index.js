import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Routes from './routes'
import { firebase } from './firebase';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faHome, faPlay, faSignInAlt, faSignOutAlt, faNewspaper, faClock } from '@fortawesome/free-solid-svg-icons'
library.add(faBars, faHome, faPlay, faSignInAlt, faSignOutAlt, faNewspaper, faClock)


const App = (props) => {
    return (
        <HashRouter>
            <Routes {...props}/>
        </HashRouter>
    )
}

firebase.auth().onAuthStateChanged((user) => {

    ReactDOM.render(<App user={user} />, document.getElementById('root'));
})
