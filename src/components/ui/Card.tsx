import type { KeyboardEvent, ReactNode } from "react";

interface CardProps {
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

export default function Card({
  isSelected,
  disabled = false,
  onClick,
  children,
}: CardProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  }

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      className={[
        "flex items-center gap-4 rounded-3xl border-2 px-5 py-4 transition-colors",
        disabled
          ? "cursor-not-allowed border-stone-200 bg-stone-100"
          : isSelected
            ? "cursor-pointer border-grass-700 bg-grass-300"
            : "cursor-pointer border-cream-700 bg-cream-300 hover:border-grass-500",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
