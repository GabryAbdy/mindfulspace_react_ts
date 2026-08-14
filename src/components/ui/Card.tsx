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
