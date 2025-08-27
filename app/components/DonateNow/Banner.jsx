import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: 'url(./banner.png)', height: '300px' }}
    >
      <div className="absolute  bg-black bg-opacity-40 flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Donate Now
        </h1>
        <p className="text-white mt-2 text-sm flex items-center gap-1">
          <span
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-green-500"
          >
            <img src="./home.svg" className="h-4 w-4" alt="Home" />
            Home
          </span>
          / Donate Now
        </p>
      </div>
    </div>
  );
};

export default Banner;
