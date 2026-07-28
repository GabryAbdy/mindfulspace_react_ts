import { useEffect, useState } from "react";
import type {
  SoundFetchResult,
  SoundPlayable,
  SoundUnavailable,
} from "./soundsTypes";
import { getSoundById } from "../../services/freesoundApi";

export default function useSounds(soundIds: number[]) {
  // Hook state

  const [isLoading, setIsLoading] = useState(true);
  const [fetchResults, setFetchResults] = useState<SoundFetchResult[]>([]);

  useEffect(() => {
    // Fetch sounds metadata

    async function fetchSounds() {
      setIsLoading(true);

      // Exectue all requests in parallel,
      // keeping track of both successes and failures
      const settledResults = await Promise.allSettled(
        soundIds.map((id) => getSoundById(id)),
      );

      // Normalize API responses

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

      // Update hook state

      setFetchResults(results);
      setIsLoading(false);
    }

    // Call async fetch without awaiting it
    void fetchSounds();
  }, [soundIds]);

  // Public hook API

  return { isLoading, fetchResults };
}
