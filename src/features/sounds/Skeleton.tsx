export default function Skeleton() {
  return (
    <div className="rounded-3xl px-5 py-4 bg-stone-100">
      <div className="flex items-center gap-4 animate-pulse">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-300"></div>
        <div className="flex h-10 w-40 rounded-3xl bg-stone-300"></div>
      </div>
    </div>
  );
}
