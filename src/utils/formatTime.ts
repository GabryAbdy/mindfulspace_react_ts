export default function formatTime(inputTime: number): string {
  const minutes = Math.floor(inputTime / 60);
  const seconds = inputTime % 60;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
