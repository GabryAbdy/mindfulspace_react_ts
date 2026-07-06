export default function decrement(seconds: number): number {
  if (seconds === 0) {
    return seconds;
  }
  return seconds - 1;
}
