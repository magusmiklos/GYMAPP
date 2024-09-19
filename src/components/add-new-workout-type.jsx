import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NewWorkoutType() {

  const [workoutType, setWorkoutType] = useState("");

  const addNewWorkoutType = () => {
    if (workoutType.trim() !== "") {
      const existingWorkoutTypes =
        JSON.parse(localStorage.getItem("workoutTypes")) || [];

      // Add the new workout type
      existingWorkoutTypes.push(workoutType);

      // Save the updated array back to local storage
      localStorage.setItem(
        "workoutTypes",
        JSON.stringify(existingWorkoutTypes)
      );

      // Optionally clear the input field after saving
      setWorkoutType("");

      const storedWorkoutTypes =
        JSON.parse(localStorage.getItem("workoutTypes")) || [];
      setWorkoutTypes(storedWorkoutTypes);
    }
  };

  const [workoutTypes, setWorkoutTypes] = useState([]);

  useEffect(() => {
    // Retrieve workout types from local storage when the component mounts
    let storedWorkoutTypes =
      JSON.parse(localStorage.getItem("workoutTypes")) || [];
    setWorkoutTypes(storedWorkoutTypes);
  }, []);

  const handleInputChange = (event) => {
    setWorkoutType(event.target.value);
  };

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const deleteWorkoutType = () => {
    if (selectedValue) {
      const existingWorkoutTypes =
        JSON.parse(localStorage.getItem("workoutTypes")) || [];

      const newWorkoutTypes = existingWorkoutTypes.filter(workout => workout !== selectedValue)

      // Save the updated array back to local storage
      localStorage.setItem(
        "workoutTypes",
        JSON.stringify(newWorkoutTypes)
      );

      let storedWorkoutTypes =
        JSON.parse(localStorage.getItem("workoutTypes")) || [];
      setWorkoutTypes(storedWorkoutTypes);
  }
}

  return (
    <div className="flex justify-center align-middle">
<div className="flex flex-col mt-20">
  <div className="docker p-5">
  <Link to="/new-workout">
          <button className="px-4 py-2 bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none">
            Back
          </button>
        </Link>
  </div>

          <p className="text-xl font-bold mb-4 w-80">New Workout Type</p>
            <input
              type="text"
              maxLength={10}
              className="mt-4 p-2 border border-gray-300 text-slate-700 rounded-md focus:outline-none focus:border-indigo-500 w-80 mb-5"
              placeholder="Enter some text"
              value={workoutType}
              onChange={handleInputChange}
            />
            <button
              className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-700 focus:outline-none w-80"
              onClick={addNewWorkoutType}
            >
              add
            </button>

        <p className="text-xl font-bold mb-4 mt-10 w-80">Workout Types</p>
        <select
          value={selectedValue}
          onChange={handleChange}
          className="block appearance-none w-80 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-slate-700"
        >
          <option className="text-slate-700 bg-white hover:bg-gray-200 focus:bg-gray-300">Choose...</option>
          {
            workoutTypes.map((type, index) => (
              <option key={index} className="text-slate-700 bg-white hover:bg-gray-200 focus:bg-gray-300">
                {type}
              </option>
     ))}
        </select>
        <button className="mt-5 w-80 mb-5 px-4 py-2 bg-red-500 rounded-md hover:bg-red-700 focus:outline-none"
        onClick={deleteWorkoutType}>
            Delete
        </button>
    </div>
    </div>
    
  );
}

export default NewWorkoutType;
