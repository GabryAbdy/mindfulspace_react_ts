import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="w-[calc(100%-0.5rem)] max-w-md mt-2 mx-auto border rounded-2xl border-sand-700 p-4 bg-sand-300 shadow-md">
      {children}
    </div>
  );
}
