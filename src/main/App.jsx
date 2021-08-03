import React from 'react';
import ReactDOM from 'react-dom';

import CRouter from './Router';

import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <CRouter />
    </Router>
  );
}

export default App;
