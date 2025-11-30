import { useState, useEffect } from 'react';

export function useClock() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utc7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      const hours = utc7Time.getUTCHours().toString().padStart(2, '0');
      const minutes = utc7Time.getUTCMinutes().toString().padStart(2, '0');
      const seconds = utc7Time.getUTCSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return { currentTime };
}