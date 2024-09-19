import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Charts from './charts';

function HomePage() {
  const [date, setDate] = useState('');

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);

  };
  const navigate = useNavigate();
  const handleSearch = () => {
    if (date.length > 0){
      navigate('/edit-workout', { state: { date } });
    }
    
  };

  return (
    <div className="flex align-middle justify-center">
      <div className="flex flex-col pt-3">
        <div className='docker'>
        <Link to="/new-workout">
          <button
            className="m-5 px-4 py-2 bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Today's Session
          </button>
        </Link>
        </div>

        <p className="font-bold">Search Session by Date</p>
        <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="mt-4 p-2 border border-gray-300 text-slate-700 rounded-md focus:outline-none focus:border-indigo-500 w-80"
              placeholder="Enter some text"
          />
            <button className="mt-5 mb-5 w-80 px-4 py-2 bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none"
            onClick={handleSearch}
            >
              Search
          </button>
          <Charts></Charts>


      </div>
    </div>

  );
}

export default HomePage;
