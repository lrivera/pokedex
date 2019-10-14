import React from 'react';
import './App.css';
import { store } from './redux'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Link
} from "react-router-dom";
import Content from './pokemons/Content'
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Content/>
      </Router>
    </Provider>
    
  );
}

export default App;