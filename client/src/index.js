import React from 'react';
import { render } from 'react-dom';
import { store } from './helpers';
import { App } from './App/index';
import { Provider } from 'react-redux';
import { configureFakeBackend } from './helpers';
configureFakeBackend();



//history 


    render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.getElementById('app')

);