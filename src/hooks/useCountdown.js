import { useState, useEffect } from 'react';

function calcTimeLeft(targetISO) {
  const diff = new Date(targetISO) - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: false,
  };
}

export default function useCountdown(targetISO) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(targetISO));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return timeLeft;
}
