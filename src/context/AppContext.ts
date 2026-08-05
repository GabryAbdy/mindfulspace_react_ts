import { createContext } from "react";

type ConfirmedSoundPlaying = {
  kind: "sound";
  freesoundId: number;
  displayName: string;
  previewUrl: string;
};

type ConfirmedSilence = {
  kind: "silence";
};

export type ConfirmedSound = ConfirmedSoundPlaying | ConfirmedSilence;

interface AppContextValue {
  durationInMinutes: number;
  setDurationInMinutes: (minutes: number) => void;
  confirmedSound: ConfirmedSound;
  confirmSound: (sound: ConfirmedSound) => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);
