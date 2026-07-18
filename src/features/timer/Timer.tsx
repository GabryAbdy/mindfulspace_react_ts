import { useState } from "react";
import useTimer from "./useTimer";
import formatTime from "../../utils/formatTime";
import { useAppContext } from "../../context/useAppContext";

export default function Timer() {
  // Hooks, State and Context
  const { durationInMinutes, setDurationInMinutes } = useAppContext();
  const initialSeconds = durationInMinutes * 60;
  const { timeLeft, isRunning, toggle, start, reset } =
    useTimer(initialSeconds);
  const [sessionOn, setSessionOn] = useState(false);

  // Helper Functions
  function beginSession() {
    setSessionOn(true);
    start();
  }
  function endSession() {
    setSessionOn(false);
    reset();
  }

  // Conditional Render Function
  function renderSessionState() {
    // Pre-session
    if (!sessionOn)
      return (
        <div>
          {/* Time Slider */}
          <div>
            <label>
              Duration
              <input
                name="durationSlider"
                type="range"
                min={1}
                max={90}
                value={durationInMinutes}
                onChange={(e) => setDurationInMinutes(Number(e.target.value))}
              />
            </label>
            <p>
              {durationInMinutes === 1
                ? "1 minuto"
                : `${durationInMinutes} minuti`}
            </p>
          </div>
          {/* Begin Button */}
          <div>
            <button
              type="button"
              onClick={beginSession}
              className="rounded bg-cream-700 border p-2 m-1 cursor-pointer"
            >
              Begin
            </button>
          </div>
        </div>
      );
    // Session Complete
    if (timeLeft === 0)
      return (
        <div>
          <h2>Sessione Completata!</h2>
          <div>
            {/* Reset Button */}
            <button
              type="button"
              onClick={endSession}
              className="rounded bg-sand-700 border p-2 m-1 cursor-pointer"
            >
              Conferma
            </button>
          </div>
        </div>
      );
    // Session Active
    return (
      <div>
        {/* Countdown */}
        <h2>{formatTime(timeLeft)}</h2>
        <div>
          {/* Resume-Pause Button */}
          <button
            type="button"
            onClick={toggle}
            className="rounded bg-grass-500 border p-2 m-1 cursor-pointer"
            disabled={timeLeft === 0}
          >
            {isRunning ? "Pause" : "Resume"}
          </button>
          {/* Reset Button */}
          <button
            type="button"
            onClick={endSession}
            className="rounded bg-sand-700 border p-2 m-1 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }

  return <div className="flex justify-center mt-2">{renderSessionState()}</div>;
}
