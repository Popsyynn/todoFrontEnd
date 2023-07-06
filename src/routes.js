import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddTask from './components/AddTask';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddTask />} />
    </Routes>
  );
};

export default AppRoutes;
