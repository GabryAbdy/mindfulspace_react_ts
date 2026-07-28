import { useEffect, useState } from "react";
import type {
  SoundFetchResult,
  SoundPlayable,
  SoundUnavailable,
} from "./soundsTypes";
import { getSoundById } from "../../services/freesoundApi";

export default function useSounds(soundIds: number[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchResults, setFetchResults] = useState<SoundFetchResult[]>([]);

  useEffect(() => {
    async function fetchSounds() {
      setIsLoading(true);

      const settledResults = await Promise.allSettled(
        soundIds.map((id) => getSoundById(id)),
      );

      const results: SoundFetchResult[] = settledResults.map(
        (result, index) => {
          const freesoundId = soundIds[index];

          if (result.status === "fulfilled") {
            return {
              status: "success",
              freesoundId,
              previewUrl: result.value.data.previews["preview-hq-mp3"],
            } satisfies SoundPlayable;
          }

          console.error(
            `Fetch failed for sound ${freesoundId}:`,
            result.reason,
          );
          return {
            status: "error",
            freesoundId,
            message: "Sound not available at the moment",
          } satisfies SoundUnavailable;
        },
      );

      setFetchResults(results);
      setIsLoading(false);
    }

    void fetchSounds();
  }, [soundIds]);

  return { isLoading, fetchResults };
}
