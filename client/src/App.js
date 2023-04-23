import React from 'react';
import { Provider } from 'react-redux'

import store from './constants/store'

import Layout from './components/Layout'

import './App.css';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Layout />
            </Provider>
        </div>
    );
}

export default App;
