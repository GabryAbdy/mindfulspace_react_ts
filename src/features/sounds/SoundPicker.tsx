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
  const [pendingSoundId, setPendingSoundId] = useState<number | null>(null);
  const { isLoading, fetchResults } = useSounds(soundIds);
  const { confirmSound } = useAppContext();

  const navigate = useNavigate();

  function handleConfirm() {
    if (pendingSoundId === null) {
      confirmSound({ kind: "silence" });
      navigate("/meditate");
      return;
    }

    const selected = fetchResults.find((s) => s.freesoundId === pendingSoundId);

    if (!selected || selected.fetchResult.status !== "success") {
      console.error(`No playable sound found for id ${pendingSoundId}`);
      return;
    }

    confirmSound({
      kind: "sound",
      freesoundId: selected.freesoundId,
      displayName: selected.displayName,
      previewUrl: selected.fetchResult.previewUrl,
    });
    navigate("/meditate");
  }

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Ambient sound selection"
        className="flex flex-col gap-3"
      >
        {isLoading ? (
          Array.from({ length: soundsCatalog.length + 1 }, (_, index) => (
            <Skeleton key={index} />
          ))
        ) : (
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
              />
            ))}
          </>
        )}
      </div>
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
