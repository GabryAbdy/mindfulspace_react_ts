import { useRef, useState, type KeyboardEvent } from "react";
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

  //Refs
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navigate = useNavigate();

  // Helper Functions
  function handleConfirm() {
    // If the user has selected "Silence", we confirm that choice and navigate to the meditation page.
    if (pendingSoundId === null) {
      confirmSound({ kind: "silence" });
      navigate("/");
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
    navigate("/");
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

  function getCurrentIndex() {
    if (pendingSoundId === null) return 0;
    const elementIndex = fetchResults.findIndex(
      (e) => e.freesoundId === pendingSoundId,
    );
    // No defense for -1 because the selected sound should always be in the list of fetched results; soundsCatalog is a static list of sounds.
    return elementIndex + 1;
  }

  function getSoundIdByIndex(index: number) {
    if (index === 0) return null;
    return fetchResults[index - 1]!.freesoundId; // % wraps around index, so non-nullable assertion is safe here.
  }

  function handleRadioGroupKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const currentIndex = getCurrentIndex();
    let newIndex: number;
    if (event.key === "ArrowDown") {
      newIndex = (currentIndex + 1) % cardRefs.current.length;
    } else {
      newIndex =
        (currentIndex - 1 + cardRefs.current.length) % cardRefs.current.length;
    }
    setPendingSoundId(getSoundIdByIndex(newIndex));
    cardRefs.current[newIndex]!.focus();
  }

  return (
    <div className="flex flex-col">
      <h2 className="mb-3 font-semibold">Select your ambient sound</h2>
      {/* Sound Options */}
      <div
        onKeyDown={handleRadioGroupKeyDown}
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
              ref={(node) => {
                cardRefs.current[0] = node;
              }}
            />
            {fetchResults.map((soundResult, index) => (
              <SoundCard
                key={soundResult.freesoundId}
                sound={soundResult}
                isSelected={pendingSoundId === soundResult.freesoundId}
                onSelect={() => setPendingSoundId(soundResult.freesoundId)}
                isPlaying={playingSoundId === soundResult.freesoundId}
                onTogglePlay={() => handleTogglePlay(soundResult.freesoundId)}
                ref={(node) => {
                  cardRefs.current[index + 1] = node;
                }}
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
        className="button disabled:cursor-not-allowed disabled:opacity-50"
      >
        Confirm
      </button>
    </div>
  );
}
