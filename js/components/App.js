
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';

import Navigator from './Navigator';

const initialState = {};
const reducer = combineReducers(reducers);

const enhancer = compose(
    applyMiddleware(thunk),
    devTools()
);
const store = createStore(reducer, initialState, enhancer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}

export default App;
