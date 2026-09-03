import { useState, useEffect, useRef } from "react";

export default function useTimer(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [prevInitialSeconds, setPrevInitialSeconds] = useState(initialSeconds);
  const endTimeRef = useRef<number | null>(null);

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
      if (endTimeRef.current === null) return;

      const nextTime = Math.max(
        0,
        Math.ceil((endTimeRef.current - Date.now()) / 1000),
      );

      setTimeLeft(nextTime);

      if (nextTime === 0) {
        setIsRunning(false);
      }
    }, 250);

    return () => clearInterval(intervalId);
    //useRef is used for endTimeRef, so it doesn't need to be in the dependency array
  }, [isRunning]);

  const toggle = () => {
    if (isRunning) {
      pause();
    } else {
      resume();
    }
  };
  const start = (explicitSeconds: number) => {
    endTimeRef.current = Date.now() + explicitSeconds * 1000;
    setTimeLeft(explicitSeconds);
    setIsRunning(true);
  };
  const pause = () => setIsRunning(false);
  const resume = () => {
    endTimeRef.current = Date.now() + timeLeft * 1000; // on resume, we need to recalculate the end time based on the remaining time left
    setIsRunning(true);
  };
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  };

  return { timeLeft, isRunning, toggle, start, reset };
}
