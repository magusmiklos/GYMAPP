import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home';
import NewWorkout from './components/add-new-workout';
import NewWorkoutType from './components/add-new-workout-type';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-workout" element={<NewWorkout date={(new Date()).toISOString()} />} />
        <Route path="/new-workout-type" element={<NewWorkoutType />} />
        <Route path="/edit-workout" element={<NewWorkout/>} />
      </Routes>
    </Router>
  );
}

export default App;
