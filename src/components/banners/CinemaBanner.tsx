// Film perforation strip — for watch-together
export default function CinemaBanner() {
  return (
    <div
      className="h-14 overflow-hidden relative bg-neutral-900 flex items-center"
      aria-hidden="true"
    >
      {/* Top perforation strip */}
      <div className="absolute inset-x-0 top-1 flex gap-2 px-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="h-2 w-4 rounded-sm bg-neutral-700 shrink-0" />
        ))}
      </div>
      {/* Bottom perforation strip */}
      <div className="absolute inset-x-0 bottom-1 flex gap-2 px-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="h-2 w-4 rounded-sm bg-neutral-700 shrink-0" />
        ))}
      </div>
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#fff_1px,_transparent_1px)] bg-[length:8px_8px]" />
    </div>
  )
}
