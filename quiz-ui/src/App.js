import React from 'react';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { NavBar } from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { Leaderboard } from './pages/Leaderboard';

export const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Quiz" element={<Quiz />} />
        <Route exact path="/Leaderboard" element={<Leaderboard />} />
        <Route exact path="/Result" element={<Result />} />
      </Routes>
    </div>
  );
};
