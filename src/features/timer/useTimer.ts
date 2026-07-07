import { useState, useEffect } from "react";
import decrement from "./timerUtils";

export default function useTimer(initialTime: number) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  // Timer interval manager
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const nextTime = decrement(prevTime);

        if (nextTime === 0) {
          setIsRunning(false);
        }

        return nextTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  return { timeLeft, isRunning, start, pause, reset };
}
