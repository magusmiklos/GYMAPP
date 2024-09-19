import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function NewWorkout(date) {
  //converts a new Date() to something like where day is the smallest time fraction
  function dateToDayKey(date){
    return date.toString().split("-").slice(0,2).join() + "," + date.toString()[8] + date.toString()[9]
  }

  const location = useLocation();
  let da = location.state || false;
  if (da == false ) {
    date = date.date
  }
  else {
    date = da.date
  }

  // localStorage.setItem("Exercises",JSON.stringify([]))

  const [exercises, setExercises] = useState([]);
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [kg, setKg] = useState("");
  const [reps, setReps] = useState("");





  useEffect(() => {
    // Retrieve workout types from local storage when the component mounts
    let storedWorkoutTypes =
      JSON.parse(localStorage.getItem("workoutTypes")) || [];
    setWorkoutTypes(storedWorkoutTypes);
  }, []);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event, args) => {
    args(event.target.value);
  };

  const handleChangeMaxLen = (event, args) => {
    if (event.target.value.length > 4){return}
    args(event.target.value);
  };

  useEffect(() => {
    let storedExercises = JSON.parse(localStorage.getItem("Exercises")) || [];
    storedExercises = storedExercises.filter(ex => dateToDayKey(ex.date) === dateToDayKey(date))
    setExercises(storedExercises);
  }, []);

  const addExercise = () => {
    if(!selectedValue){return}
    console.log(selectedValue)

    const NewExercise = {
      date: date.slice(0,10) + (new Date()).toISOString().slice(10),
      exercise: selectedValue,
      reps: reps,
      kg: kg,
    };


    let existingExercises =
      JSON.parse(localStorage.getItem("Exercises")) || [];
    existingExercises.push(NewExercise);

    localStorage.setItem("Exercises", JSON.stringify(existingExercises));
    existingExercises = existingExercises.filter(ex => dateToDayKey(ex.date) === dateToDayKey(date))
    setExercises(existingExercises);

    setKg("");
    setReps("");
  };
  const delExercise = (d) => {
    const ExercisesList = JSON.parse(localStorage.getItem("Exercises")) || [];

    let newExercisesList = ExercisesList.filter((ex) => ex.date !== d);
    newExercisesList = newExercisesList.filter(ex => dateToDayKey(ex.date) === dateToDayKey(date))
    localStorage.setItem("Exercises", JSON.stringify(newExercisesList));
    setExercises(newExercisesList);
  };

  const upExercise = (d) => {
    let ExercisesList = JSON.parse(localStorage.getItem("Exercises")) || [];

    const item = ExercisesList.filter((ex) => ex.date === d)[0];
    const ind = ExercisesList.indexOf(item)
    if (ind > 0) {
      
      const item2 = ExercisesList[ind -1]

      ExercisesList[ind] = item2
      ExercisesList[ind-1] = item

      ExercisesList = ExercisesList.filter(ex => dateToDayKey(ex.date) === dateToDayKey(date))
      localStorage.setItem("Exercises", JSON.stringify(ExercisesList));
      setExercises(ExercisesList);
    }
    

  };
  const downExercise = (date) => {
    let ExercisesList = JSON.parse(localStorage.getItem("Exercises")) || [];

    const item = ExercisesList.filter((ex) => ex.date === date)[0];
    const ind = ExercisesList.indexOf(item)
    if (ind < ExercisesList.length-1) {
      
      const item2 = ExercisesList[ind +1]

      ExercisesList[ind] = item2
      ExercisesList[ind+1] = item

      ExercisesList = ExercisesList.filter(ex => dateToDayKey(ex.date) === dateToDayKey(date))
      localStorage.setItem("Exercises", JSON.stringify(ExercisesList));
      setExercises(ExercisesList);
    }
    

  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-3">
        <div className="docker p-5">
          <Link to="/">
            <button className="px-4 py-2 bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none mr-5">
              Back
            </button>
          </Link>

          <Link to="/new-workout-type">
            <button className="px-4 py-2 bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none">
              Types
            </button>
          </Link>
        </div>
<div>
          <p className="font-bold">exercise</p>
          <select
            value={selectedValue}
            onChange={(event) => handleChange(event, setSelectedValue)}
            className="mt-1 block appearance-none w-80 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-slate-700"
          >
            <option className="text-slate-700 bg-white hover:bg-gray-200 focus:bg-gray-300">
              Choose...
            </option>
            {workoutTypes.map((type, index) => (
              <option
                key={index}
                className="text-slate-700 bg-white hover:bg-gray-200 focus:bg-gray-300"
              >
                {type}
              </option>
            ))}
          </select>
          </div>
          <div>
          <p className="font-bold mt-2">kg</p>
          <input
            value={kg}
            onChange={(event) => handleChangeMaxLen(event, setKg)}
            type="number"
            className="mt-1 p-2 border border-gray-300 text-slate-700 rounded-md focus:outline-none focus:border-indigo-500 w-80"
            placeholder="Enter a number"
          />
          </div>
          <div>
          <p className="font-bold mt-2">reps</p>
          <input
            value={reps}
            onChange={(event) => handleChangeMaxLen(event, setReps)}
            type="number"
            className="mt-1 p-2 border border-gray-300 text-slate-700 rounded-md focus:outline-none focus:border-indigo-500 w-80"
            placeholder="Enter a number"
          />
</div>
        <button
          className="mb-10 mt-5 w-80 px-4 py-2 bg-green-500 rounded-md hover:bg-green-700 focus:outline-none"
          onClick={addExercise}
        >
          add
        </button>
      </div>
      <div className="flex justify-center align-middle flex-row mt-1">
        
          {exercises.length > 0 ? (
            <div className="bg-slate-200  bg-opacity-10 pt-2 pb-2 pl-1 pr-1 rounded-md grid grid-cols-5 gap-x-5 gap-y-3 font-bold place-items-center m-3">
{
          
          exercises.map((type, index) => (
            <>
              <p className="text-xs">{type.exercise}</p>
              <p className="text-xs">{type.kg} kg</p>
              <p className="text-xs">{type.reps} reps</p>
              <div className="flex flex-row justify-around align-middle col-span-2">
                <button
                  className="mr-1 px-2 py-2 bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none "
                  onClick={() => upExercise(type.date)}
                >
                  <svg className="w-5 fill-white h-5" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"/></svg>
                </button>
                
                <button
                  className="mr-1 px-2 py-2 bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none "
                  onClick={() => downExercise(type.date)}
                >
                  <svg className="w-5 fill-white h-5" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"/></svg>
                </button>
                <button
                  className="px-2 py-2 bg-red-500 rounded-md hover:bg-red-700 focus:outline-none "
                  onClick={() => delExercise(type.date)}
                >
                  <svg className="w-5 fill-white h-5" fill="#000000" height="800px" width="800px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 32 32" xml:space="preserve">
<path d="M24,8h-3V7c0-2.8-2.2-5-5-5s-5,2.2-5,5v1H8c-1.7,0-3,1.3-3,3v3c0,0.6,0.4,1,1,1h1v12c0,1.7,1.3,3,3,3h12c1.7,0,3-1.3,3-3V15
	h1c0.6,0,1-0.4,1-1v-3C27,9.3,25.7,8,24,8z M13,7c0-1.7,1.3-3,3-3s3,1.3,3,3v1h-6V7z M14,24c0,0.6-0.4,1-1,1s-1-0.4-1-1v-5
	c0-0.6,0.4-1,1-1s1,0.4,1,1V24z M20,24c0,0.6-0.4,1-1,1s-1-0.4-1-1v-5c0-0.6,0.4-1,1-1s1,0.4,1,1V24z"/>
</svg>
                </button>
                </div>
            </>
          ))
          
          }
            </div>

          ) : (
            <p>no exercises for this day...</p>
          )}
          
      </div>
    </>
  );
}

export default NewWorkout;
