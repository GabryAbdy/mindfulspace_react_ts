import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import type { SoundWithStatus } from "./soundsTypes";
import Card from "../../components/ui/Card";

interface SoundCardProps {
  sound: SoundWithStatus;
  isSelected: boolean;
  onSelect: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function SoundCard({
  sound,
  isSelected,
  onSelect,
  isPlaying,
  onTogglePlay,
}: SoundCardProps) {
  // Refs and Constants
  const audioRef = useRef<HTMLAudioElement>(null);
  const isUnavailable = sound.fetchResult.status === "error";
  const PREVIEW_DURATION_SECONDS = 10;

  // Playback Control
  // Starts or stops the preview when the component enters or leaves the playing state.
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {}); // We catch any errors that may occur when trying to play the audio, such as if the user hasn't interacted with the page yet.
    } else {
      audio.pause();
      audio.currentTime = 0; // Reset the preview to the beginning when it is stopped.
    }
  }, [isPlaying]);

  // Auto-stop Logic
  // When the preview reaches its maximum duration, it stops and the parent state is updated.
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    //Flag to track if the audio was stopped automatically by the timeout logic.
    let autoStoppedByTimeout = false;

    function handleTimeUpdate() {
      if (!audio) return;
      if (audio.currentTime >= PREVIEW_DURATION_SECONDS) {
        // The preview reached its maximum duration, so we stop it and reset the position.
        audio.pause();
        audio.currentTime = 0;
        autoStoppedByTimeout = true;
      }
    }

    function handlePause() {
      // If playback was stopped automatically, update the parent play state.
      if (autoStoppedByTimeout === true) {
        onTogglePlay();
        autoStoppedByTimeout = false;
      }
    }

    // Event Listeners
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("pause", handlePause);

    // Cleanup
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("pause", handlePause);
    };
  }, [onTogglePlay]);

  return (
    <Card isSelected={isSelected} disabled={isUnavailable} onClick={onSelect}>
      {/* Render the audio element only when a preview is available. */}
      {sound.fetchResult.status === "success" && (
        <audio ref={audioRef} src={sound.fetchResult.previewUrl} />
      )}
      {/* Play/Pause Button */}
      <button
        type="button"
        onClick={onTogglePlay}
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full cursor-pointer",
          isUnavailable
            ? "bg-stone-300 text-stone-500"
            : "bg-grass-700 text-white",
        ].join(" ")}
      >
        {isPlaying ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
      {/* Sound Name */}
      <div className="flex flex-col">
        <div
          className={
            isUnavailable
              ? "font-medium text-stone-400"
              : "font-medium text-cream-700"
          }
        >
          {sound.displayName}
        </div>
        {/* Error Message */}
        {sound.fetchResult.status === "error" && (
          <div className="text-sm text-stone-400">
            {sound.fetchResult.message}
          </div>
        )}
      </div>
    </Card>
  );
}
