import type { KeyboardEvent, ReactNode, Ref } from "react";

interface CardProps {
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export default function Card({
  isSelected,
  disabled = false,
  onClick,
  children,
  ref,
}: CardProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    if (event.target !== event.currentTarget) return; // Only handle keydown events on the card itself, not its children.
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  }

  const tabIndex = isSelected ? (disabled ? -1 : 0) : -1;

  return (
    <div
      ref={ref}
      role="radio"
      aria-checked={isSelected}
      aria-disabled={disabled}
      tabIndex={tabIndex}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      className={[
        "flex items-center gap-4 rounded-2xl border-2 h-16 p-5 transition-colors duration-150 active:scale-95",
        disabled
          ? "cursor-not-allowed border-stone-200 bg-stone-100"
          : isSelected
            ? "cursor-pointer border-grass-700 bg-grass-500 hover:bg-grass-300"
            : "cursor-pointer border-sand-700 bg-cream-300 hover:bg-cream-500 hover:shadow-md hover:scale-105",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
