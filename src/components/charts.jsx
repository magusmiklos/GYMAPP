import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Charts() {
  const [selectedValue, setSelectedValue] = useState("");
  const [timeFrame, setTimeFrame] = useState(30);
  const [showChartMaker, setShowChartMaker] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const bottomRef = useRef(null);
  const topRef = useRef(null);

  const handleShowChart = () => {
    setShowChartMaker(!showChartMaker);

    setTimeout(() => {
      if (!showChartMaker) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  //chart data fill
  function refreshChart(){
    if(!selectedValue || timeFrame === "Choose..."){return false}
    let wokroutsForChart = JSON.parse(localStorage.getItem("Exercises")) || [];

    wokroutsForChart = wokroutsForChart.filter(
      (w) => w.exercise === selectedValue
    );

    wokroutsForChart = wokroutsForChart.slice(0,parseInt(timeFrame.split(" ")[1]));
    wokroutsForChart = wokroutsForChart.sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log(wokroutsForChart)

    const reps = wokroutsForChart.map(workout => workout.reps)
    const kgs = wokroutsForChart.map(workout => workout.kg)
    setData({
      labels: reps,
      datasets: [
        {
          label: '',
          backgroundColor: "rgba(87, 74, 226)",
          borderColor: "rgba(34, 42, 104)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(171, 129, 205)",
          hoverBorderColor: "rgba(101, 69, 151)",
          data: kgs,
        },
      ],
    }
  );
  setOptions({
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: wokroutsForChart[0].exercise,
      },
    },
  })
  topRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    refreshChart()
  }, []);

  const [data,setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Kg",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [],
      },
    ],
  });

  const [options,setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "",
      },
    },
  });

  const [workoutTypes, setWorkoutTypes] = useState([]);

  useEffect(() => {
    // Retrieve workout types from local storage when the component mounts
    let storedWorkoutTypes =
      JSON.parse(localStorage.getItem("workoutTypes")) || [];
    setWorkoutTypes(storedWorkoutTypes);
  }, []);

  const handleTimeFrame = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <>
      <div className="absolute top-0" ref={topRef}></div>
      <Bar className="mt-1" data={data} options={options} height={300} />
      {showChartMaker ? (
        <button
          className="mb-28 mt-5 w-80 px-4 py-2 bg-red-500 rounded-md hover:bg-red-700 focus:outline-none"
          onClick={handleShowChart}
        >
          Hide Chart Maker
        </button>
      ) : (
        <button
          className="mb-28 mt-5 w-80 px-4 py-2 bg-green-500 rounded-md hover:bg-green-700 focus:outline-none"
          onClick={handleShowChart}
        >
          Chart Maker
        </button>
      )}

      {showChartMaker ? (
        <>
          <p className="font-bold mt-5">Time Frame</p>
          <select
            value={timeFrame}
            onChange={handleTimeFrame}
            className="mt-5 mb-5 block appearance-none w-80 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-slate-700"
          >
            <option className="text-slate-700 bg-white hover:bg-gray-200 focus:bg-gray-300">
              Choose...
            </option>
            <option className="text-slate-700 bg-white hover:bg-gray-200 focus:bg-gray-300">
              Last 10
            </option>
            <option className="text-slate-700 bg-white hover:bg-gray-200 focus:bg-gray-300">
              Last 25
            </option>
            <option className="text-slate-700 bg-white hover:bg-gray-200 focus:bg-gray-300">
              Last 50
            </option>
            <option className="text-slate-700 bg-white hover:bg-gray-200 focus:bg-gray-300">
              Last 100
            </option>
            <option className="text-slate-700 bg-white hover:bg-gray-200 focus:bg-gray-300">
              Last 1000
            </option>
          </select>

          <p className="font-bold mt-10">Workout Type</p>
          <select
            value={selectedValue}
            onChange={handleChange}
            className="mt-5 mb-5 block appearance-none w-80 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-slate-700"
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

          <button className="mb-52 mt-5 w-80 px-4 py-2 bg-green-500 rounded-md hover:bg-green-700 focus:outline-none"
          onClick={refreshChart}>
            Generate Chart
          </button>
          <div ref={bottomRef}></div>
        </>
      ) : null}
    </>
  );
}
export default Charts;
