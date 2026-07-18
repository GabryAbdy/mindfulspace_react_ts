import { type ReactNode, useState } from "react";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }: { children: ReactNode }) {
  const [durationInMinutes, setDurationInMinutes] = useState(45);
  return (
    <AppContext.Provider value={{ durationInMinutes, setDurationInMinutes }}>
      {children}
    </AppContext.Provider>
  );
}
