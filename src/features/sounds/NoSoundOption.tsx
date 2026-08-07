import Card from "../../components/ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

interface NoSoundOptionProps {
  isSelected: boolean;
  onSelect: () => void;
}

export default function NoSoundOption({
  isSelected,
  onSelect,
}: NoSoundOptionProps) {
  return (
    <Card isSelected={isSelected} onClick={onSelect}>
      <FontAwesomeIcon
        icon={faVolumeXmark}
        className="flex h-10 w-10 shrink-0 items-center justify-center text-cream-700"
      />
      <div className="font-medium text-cream-700">Silence</div>
    </Card>
  );
}
