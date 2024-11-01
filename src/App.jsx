import React, { useEffect, useState } from 'react';
import apiRequest from './apiRequest';
import clock from './assets/clock.svg';

function App() {
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState('');
  const [dataInfo, setDataInfo] = useState('');
  const [mainContentOn, setMainContentOn] = useState('hidden');
  const [error, setError] = useState('');

  const fetchCoordinates = async () => {
    const url = `http://ip-api.com/json/${coordinates}`;
    setLoading(true);
    const data = await apiRequest(url);
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      setDataInfo(data);
    }
  };

  const handleOnContent = () => {
    setMainContentOn('block');
  };
  const handleOffContent = () => {
    setMainContentOn('hidden');
  };

  useEffect(() => {
    fetchCoordinates();
  }, []);

  const takeInputValue = (event) => {
    event.preventDefault();
    setCoordinates(event.target.value);
  };
  console.log(dataInfo);

  return (
    <>
      <div className='max-w-[1440px] w-full flex items-center justify-center pt-[90px] flex-col '>
        <div className='w-[260px] flex justify-between'>
          <button
            className='bg-[#E27125] text-white rounded-[8px] w-[146px] h-[37px] '
            onClick={handleOnContent}
          >
            Add Item
          </button>
          <button
            className='bg-black text-white rounded-[8px] w-[83px] h-[37px]'
            onClick={handleOffContent}
          >
            clear
          </button>
        </div>
        <div className='w-[260px] mt-[21px]'>
          <button
            className='w-full rounded-[8px] h-[37px] bg-black text-white'
            onClick={fetchCoordinates}
          >
            Toggle Card
          </button>
        </div>
        <div
          className={`w-[260px] rounded-[8px] bg-[#19191B] text-white mt-[28px] ${mainContentOn}`}
        >
          <form>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className='flex flex-col items-center'>
                <div className='w-full flex justify-between p-[10px]'>
                  <h2>IP adress</h2>
                  <button onClick={handleOffContent}>✕</button>
                </div>
                <input
                  type='text'
                  className='w-[220px] bg-black text-white rounded-[8px] mb-[20px]'
                  onChange={takeInputValue}
                />
              </div>
            )}
          </form>
          <div>
            {error ? (
              <div>Error: {error}</div>
            ) : (
              <div className='ml-[10px] mb-3'>
                <div>{dataInfo.city}</div>
                <div className='w-full flex items-center justify-start '>
                  <img src={clock} alt='clock icon' /> {dataInfo.timezone}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App; 
