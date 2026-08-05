import { type ReactNode, useState } from "react";
import { AppContext, type ConfirmedSound } from "./AppContext";

export default function AppProvider({ children }: { children: ReactNode }) {
  const [durationInMinutes, setDurationInMinutes] = useState(45);
  const [confirmedSound, confirmSound] = useState<ConfirmedSound>({
    kind: "silence",
  });

  return (
    <AppContext.Provider
      value={{
        durationInMinutes,
        setDurationInMinutes,
        confirmedSound,
        confirmSound,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
