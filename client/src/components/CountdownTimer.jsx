import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime, onTimeout, reset }) => {
  const [countdown, setCountdown] = useState(initialTime);

  useEffect(() => {
    setCountdown(initialTime);
  }, [initialTime, reset]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => Math.max(prevCountdown - 1, 0));
      if (countdown === 0 && onTimeout) {
        clearInterval(timer);
        onTimeout();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime, countdown, onTimeout, reset]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      <p className='text-red-500'>{formatTime(countdown)}</p>
    </div>
  );
};

export default CountdownTimer;
