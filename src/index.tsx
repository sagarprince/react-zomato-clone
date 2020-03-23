import React from 'react';
import ReactDOM from 'react-dom';
import { akitaDevtools, persistState } from '@datorama/akita';
import BootstrapProvider from '@bootstrap-styled/provider';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';

declare let document: any;

akitaDevtools();

persistState({
    include: ['restaurants'],
    preStorageUpdate: (storeName: string, state: any) => {
        if (storeName === 'restaurants') {
            const { isLoading, ...rest } = state;
            return { ...rest };
        }
        return state;
    }
});

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
