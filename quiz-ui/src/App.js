import React from 'react';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { NavBar } from './components/NavBar';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/Home" element={<Home />} />
        <Route path="/" element={<Home />}></Route>
        <Route exact path="/Quiz" element={<Quiz />} />
        <Route exact path="/Result" element={<Result />} />
      </Routes>
    </div>
  );
};
