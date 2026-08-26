import Card from "../../components/ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import type { Ref } from "react";

interface NoSoundOptionProps {
  isSelected: boolean;
  onSelect: () => void;
  ref?: Ref<HTMLDivElement>;
}

export default function NoSoundOption({
  isSelected,
  onSelect,
  ref,
}: NoSoundOptionProps) {
  return (
    <Card isSelected={isSelected} onClick={onSelect} ref={ref}>
      <div className="flex h-10 w-10 shrink-0 rounded-full items-center justify-center border border-sand-700 bg-cream-300 text-sand-700">
        <FontAwesomeIcon icon={faVolumeXmark} />
      </div>
      <div className="font-bold text-black italic">Silence</div>
    </Card>
  );
}
