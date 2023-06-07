import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App'; // where we are going to specify our routes

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root')
// );
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.Fragment>
    <Router>
      <App />
    </Router>
  </React.Fragment>
);
