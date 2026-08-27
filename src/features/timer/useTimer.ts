import { useState, useEffect } from "react";
import decrement from "./timerUtils";

export default function useTimer(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [prevInitialSeconds, setPrevInitialSeconds] = useState(initialSeconds);

  if (initialSeconds !== prevInitialSeconds) {
    setPrevInitialSeconds(initialSeconds);
    if (!isRunning) {
      setTimeLeft(initialSeconds);
    }
  }

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

  const toggle = () => {
    if (isRunning) {
      pause();
    } else {
      resume();
    }
  };
  const start = (explicitSeconds: number) => {
    setTimeLeft(explicitSeconds);
    setIsRunning(true);
  };
  const pause = () => setIsRunning(false);
  const resume = () => setIsRunning(true);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  };

  return { timeLeft, isRunning, toggle, start, reset };
}
