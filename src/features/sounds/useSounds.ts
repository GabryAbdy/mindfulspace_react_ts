import { useEffect, useState } from "react";
import type {
  SoundMeta,
  SoundPlayable,
  SoundUnavailable,
  SoundWithStatus,
} from "./soundsTypes";
import { getSoundById } from "../../services/freesoundApi";
import { soundsCatalog } from "./soundsCatalog";

type CatalogLookup = Record<number, SoundMeta>;

const catalogLookup = soundsCatalog.reduce<CatalogLookup>(
  (dictionary, sound) => {
    dictionary[sound.freesoundId] = sound;
    return dictionary;
  },
  {},
);

export default function useSounds(soundIds: number[]) {
  // Hook state

  const [isLoading, setIsLoading] = useState(true);
  const [fetchResults, setFetchResults] = useState<SoundWithStatus[]>([]);

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

      const results: SoundWithStatus[] = settledResults.map((result, index) => {
        const freesoundId = soundIds[index]!;
        const meta = catalogLookup[freesoundId];

        // Guard: treat a missing catalog entry as unavailable
        if (!meta) {
          console.error(`No catalog entry found for sound ${freesoundId}`);
          return {
            freesoundId,
            displayName: "Unknown sound",
            fetchResult: {
              status: "error",
              message: "Sound not available at the moment",
            } satisfies SoundUnavailable,
          };
        }

        // From this on, TypeScript narrows meta to SoundMeta

        if (result.status === "fulfilled") {
          return {
            ...meta,
            fetchResult: {
              status: "success",
              previewUrl: result.value.data.previews["preview-hq-mp3"],
            } satisfies SoundPlayable,
          };
        }

        console.error(`Fetch failed for sound ${freesoundId}:`, result.reason);
        return {
          ...meta,
          fetchResult: {
            status: "error",
            message: "Sound not available at the moment",
          } satisfies SoundUnavailable,
        };
      });

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
