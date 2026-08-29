import { useEffect, useRef } from "react";
import type { ConfirmedSound } from "../../context/AppContext";

export default function useSessionAudio(
  confirmedSound: ConfirmedSound,
  isRunning: boolean,
) {
  // Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Setup
  useEffect(() => {
    let audio: HTMLAudioElement;

    if (confirmedSound.kind === "silence") return;

    if (!audioRef.current) {
      // If the audio element doesn't exist yet, we create it and set it up for playback.
      audio = new Audio();
      audio.loop = true;
      audioRef.current = audio;
    } else {
      // If the audio element already exists, we just use it.
      audio = audioRef.current;
      audio.pause();
      audio.currentTime = 0;
    }

    // We set the source of the audio element to the preview URL of the confirmed sound.
    audio.src = confirmedSound.previewUrl;

    // Cleanup
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [confirmedSound]);

  // Playback Control
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isRunning) {
      audio.currentTime = 0; // Reset the audio to the beginning before playing
      audio.play().catch(() => {}); // We catch any errors that may occur when trying to play the audio, such as if the user hasn't interacted with the page yet.
    } else {
      audio.pause();
    }
  }, [isRunning]);
}
