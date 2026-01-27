export default function Skeleton({ lines = 5 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-muted rounded w-full" />
      ))}
    </div>
  );
}
