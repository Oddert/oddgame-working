import React from 'react';
import './App.css';
import { Provider } from 'react-redux'

import store from './constants/store'

// import Marbles from './components/marbles/'
// import Sentry from './components/sentry/'
// import Slider from './components/slider/'
import Index from './components/working/'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Index />
      </Provider>
    </div>
  );
}

export default App;
