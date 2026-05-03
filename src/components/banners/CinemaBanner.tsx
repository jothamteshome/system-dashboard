// Film strip full card background — for watch-together
export default function CinemaBanner() {
  return (
    <div className="absolute inset-0 bg-neutral-950 overflow-hidden">
      {/* Left sprocket strip */}
      <div className="absolute left-0 inset-y-0 w-8 bg-neutral-900 flex flex-col justify-around items-center py-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-4 h-3 rounded-sm bg-neutral-950 border border-neutral-700" />
        ))}
      </div>
      {/* Right sprocket strip */}
      <div className="absolute right-0 inset-y-0 w-8 bg-neutral-900 flex flex-col justify-around items-center py-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-4 h-3 rounded-sm bg-neutral-950 border border-neutral-700" />
        ))}
      </div>
      {/* Center film area — subtle scanlines */}
      <div
        className="absolute inset-y-0 opacity-5"
        style={{
          left: '2rem',
          right: '2rem',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, #fff 3px, #fff 4px)',
        }}
      />
    </div>
  )
}

