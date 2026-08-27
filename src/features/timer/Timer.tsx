import { useState } from "react";
import useTimer from "./useTimer";
import formatTime from "../../utils/formatTime";
import { useAppContext } from "../../context/useAppContext";
import { Link } from "react-router";
import useSessionAudio from "./useSessionAudio";

const PRESETS = [1, 5, 10, 15, 30, 45, 60, 90];

interface PresetPickerProps {
  onSelect: (minutes: number) => void;
}

function PresetPicker({ onSelect }: PresetPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4">
      {PRESETS.map((minutes) => (
        <button
          key={minutes}
          type="button"
          onClick={() => onSelect(minutes)}
          className="min-h-16 px-2 py-3 border rounded-2xl border-grass-700 font-semibold bg-pea-300 cursor-pointer transition-all duration-150 hover:bg-pea-500 hover:scale-105 hover:shadow-md active:bg-pea-700 active:scale-90"
        >
          {minutes} min
        </button>
      ))}
    </div>
  );
}

export default function Timer() {
  // App Context
  const { durationInMinutes, setDurationInMinutes, confirmedSound } =
    useAppContext();

  // Timer Hook
  const initialSeconds = durationInMinutes * 60;
  const { timeLeft, isRunning, toggle, start, reset } =
    useTimer(initialSeconds);

  // Audio Playback
  useSessionAudio(confirmedSound, isRunning);

  // Session State
  const [sessionOn, setSessionOn] = useState(false);

  // Helper Functions
  function beginSession(explicitMinutes?: number) {
    const minutesToSet = explicitMinutes ?? durationInMinutes;
    setDurationInMinutes(minutesToSet);
    setSessionOn(true);
    start(minutesToSet * 60);
  }
  function endSession() {
    setSessionOn(false);
    reset();
  }

  // Slider Progress Calculation
  const sliderProgress = ((durationInMinutes - 1) / (90 - 1)) * 100;

  // Conditional Render Function
  function renderSessionState() {
    // Pre-session
    if (!sessionOn)
      return (
        <div>
          <h2 className="mb-3 font-semibold">
            Select a fixed duration and start the session
          </h2>
          <PresetPicker onSelect={beginSession} />
          <div className="flex w-4/5 my-5 mx-auto items-center gap-3">
            <hr className="flex-1" />
            <span className="italic">Otherwise</span>
            <hr className="flex-1" />
          </div>
          {/* Time Slider */}
          <div className="w-full">
            <label
              htmlFor="durationSlider"
              className="mb-3 block font-semibold"
            >
              Select a personalized duration
            </label>
            <div className="flex mb-4 items-center gap-4">
              <input
                id="durationSlider"
                name="durationSlider"
                type="range"
                min={1}
                max={90}
                value={durationInMinutes}
                onChange={(e) => setDurationInMinutes(Number(e.target.value))}
                // Custom CSS Variable for Slider Progress
                style={
                  {
                    "--slider-progress": `${sliderProgress}%`,
                  } as React.CSSProperties
                }
                className="duration-slider"
              />

              <span className="min-w-30 rounded-xl bg-cream-500 px-3 py-2 text-center">
                {durationInMinutes === 1
                  ? "1 minute"
                  : `${durationInMinutes} minutes`}
              </span>
            </div>
          </div>
          {/* Sound Selector */}
          <div>
            <p className="mb-3 font-semibold">And your favourite sound</p>
            <div className="flex mb-3 px-5 py-3 items-center justify-between rounded-2xl border border-sand-700 bg-cream-500 ">
              <span className="font-semibold italic">
                {confirmedSound.kind === "sound"
                  ? confirmedSound.displayName
                  : "Silence"}
              </span>
              <Link
                to="/sounds"
                className="underline hover:scale-105 active:scale-95"
              >
                change
              </Link>
            </div>
          </div>
          {/* Begin Button */}
          <button
            type="button"
            onClick={() => beginSession()}
            className="block p-4 mt-6 w-44 mx-auto rounded-xl text-lg font-bold border border-cream-700 bg-cream-700 shadow-md cursor-pointer transition-all duration-150 hover:bg-grass-700 hover:border-grass-700 hover:shadow-lg hover:scale-105 active:scale-90 active:bg-grass-700 active:border-grass-700"
          >
            Start Meditation
          </button>
        </div>
      );
    // Session Complete
    if (timeLeft === 0)
      return (
        <div>
          <h2>
            You meditated for {durationInMinutes}{" "}
            {durationInMinutes === 1 ? "minute" : "minutes"}. Well done.
          </h2>
          <div>
            {/* Reset Button */}
            <button
              type="button"
              onClick={endSession}
              className="rounded bg-sand-700 border p-2 m-1 cursor-pointer"
            >
              Confirm
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

  return <div>{renderSessionState()}</div>;
}
