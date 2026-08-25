import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="w-full md:max-w-md mt-2 md:mx-auto md:border md:rounded-2xl md:border-sand-300 p-4 md:bg-cream-500 md:shadow-md">
      {children}
    </div>
  );
}
