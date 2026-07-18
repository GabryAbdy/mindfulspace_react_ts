import { createContext } from "react";

interface AppContextValue {
  durationInMinutes: number;
  setDurationInMinutes: (minutes: number) => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);
