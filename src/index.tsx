import React from 'react';
import ReactDOM from 'react-dom';
import { akitaDevtools } from '@datorama/akita';
import BootstrapProvider from '@bootstrap-styled/provider';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';

akitaDevtools();

// persistState({
//     include: []
// });

ReactDOM.render(
    <BootstrapProvider theme={{ '$font-family-sans-serif': '"Fira Sans Condensed", sans-serif' }}>
        <App />
    </BootstrapProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
