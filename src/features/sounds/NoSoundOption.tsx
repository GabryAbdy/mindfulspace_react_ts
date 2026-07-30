import Card from "../../components/ui/Card";

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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-grass-700 text-white">
        ✕
      </div>
      <div className="font-medium text-cream-700">Silence</div>
    </Card>
  );
}
