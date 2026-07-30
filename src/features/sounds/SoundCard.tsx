import type { SoundWithStatus } from "./soundsTypes";
import Card from "../../components/ui/Card";

interface SoundCardProps {
  sound: SoundWithStatus;
  isSelected: boolean;
  onSelect: () => void;
}

export default function SoundCard({
  sound,
  isSelected,
  onSelect,
}: SoundCardProps) {
  const isUnavailable = sound.fetchResult.status === "error";

  return (
    <Card isSelected={isSelected} disabled={isUnavailable} onClick={onSelect}>
      {/* Static play/pause button. Playback logic later */}
      <div
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          isUnavailable
            ? "bg-stone-300 text-stone-500"
            : "bg-grass-700 text-white",
        ].join(" ")}
      >
        ▶
      </div>
      <div className="flex flex-col">
        <div
          className={
            isUnavailable
              ? "font-medium text-stone-400"
              : "font-medium text-cream-700"
          }
        >
          {sound.displayName}
        </div>
        {sound.fetchResult.status === "error" && (
          <div className="text-sm text-stone-400">
            {sound.fetchResult.message}
          </div>
        )}
      </div>
    </Card>
  );
}
