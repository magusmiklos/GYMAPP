import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home';
import NewWorkout from './components/add-new-workout';
import NewWorkoutType from './components/add-new-workout-type';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/GYMAPP/" element={<HomePage />} />
        <Route path="/GYMAPP/new-workout" element={<NewWorkout date={(new Date()).toISOString()} />} />
        <Route path="/GYMAPP/new-workout-type" element={<NewWorkoutType />} />
        <Route path="/GYMAPP/edit-workout" element={<NewWorkout/>} />
      </Routes>
    </Router>
  );
}

export default App;
