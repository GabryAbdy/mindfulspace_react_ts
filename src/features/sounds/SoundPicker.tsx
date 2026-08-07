import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../../context/useAppContext";
import { soundsCatalog } from "./soundsCatalog";
import useSounds from "./useSounds";
import Skeleton from "./Skeleton";
import NoSoundOption from "./NoSoundOption";
import SoundCard from "./SoundCard";

const soundIds = soundsCatalog.map((sound) => sound.freesoundId);

export default function SoundPicker() {
  // Hooks, State and Context
  const { confirmedSound, confirmSound } = useAppContext();
  const [pendingSoundId, setPendingSoundId] = useState<number | null>(() => {
    if (confirmedSound.kind === "sound") return confirmedSound.freesoundId;
    return null;
  });
  const [playingSoundId, setPlayingSoundId] = useState<number | null>(null);
  const { isLoading, fetchResults } = useSounds(soundIds);

  const navigate = useNavigate();

  // Helper Functions
  function handleConfirm() {
    // If the user has selected "Silence", we confirm that choice and navigate to the meditation page.
    if (pendingSoundId === null) {
      confirmSound({ kind: "silence" });
      navigate("/meditate");
      return;
    }
    // If the user has selected a sound, we find the corresponding sound object from the fetched results.
    const selected = fetchResults.find((s) => s.freesoundId === pendingSoundId);
    // If the selected sound is not found or its fetch result indicates an error, we log an error message and do not proceed with confirmation.
    if (!selected || selected.fetchResult.status !== "success") {
      console.error(`No playable sound found for id ${pendingSoundId}`);
      return;
    }
    // If the selected sound is valid, we confirm the selection and navigate to the meditation page.
    confirmSound({
      kind: "sound",
      freesoundId: selected.freesoundId,
      displayName: selected.displayName,
      previewUrl: selected.fetchResult.previewUrl,
    });
    navigate("/meditate");
  }
  function handleTogglePlay(freesoundId: number) {
    // If the user clicks the play button for a sound that is already playing, we stop the playback and reset the playing state.
    if (playingSoundId === freesoundId) {
      setPlayingSoundId(null);
      return;
    }
    // If the user clicks the play button for a different sound, we start playing that sound and update the playing state.
    setPlayingSoundId(freesoundId);
  }

  return (
    <div>
      {/* Sound Options */}
      <div
        role="radiogroup"
        aria-label="Ambient sound selection"
        className="flex flex-col gap-3"
      >
        {isLoading ? (
          // Skeletons are displayed while the sound data is being fetched.
          Array.from({ length: soundsCatalog.length + 1 }, (_, index) => (
            <Skeleton key={index} />
          ))
        ) : (
          // Once the sound data is loaded, we render the "Silence" option and the list of available sounds.
          <>
            <NoSoundOption
              isSelected={pendingSoundId === null}
              onSelect={() => setPendingSoundId(null)}
            />
            {fetchResults.map((soundResult) => (
              <SoundCard
                key={soundResult.freesoundId}
                sound={soundResult}
                isSelected={pendingSoundId === soundResult.freesoundId}
                onSelect={() => setPendingSoundId(soundResult.freesoundId)}
                isPlaying={playingSoundId === soundResult.freesoundId}
                onTogglePlay={() => handleTogglePlay(soundResult.freesoundId)}
              />
            ))}
          </>
        )}
      </div>
      {/* Confirm Button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={handleConfirm}
        className="rounded bg-grass-700 border p-2 m-1 cursor-pointer"
      >
        Confirm
      </button>
    </div>
  );
}
