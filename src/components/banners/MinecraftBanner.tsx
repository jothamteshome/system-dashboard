// Dirt/grass pixel art strip — pure CSS, no images
export default function MinecraftBanner() {
  return (
    <div className="h-14 overflow-hidden relative" aria-hidden="true">
      {/* Grass layer */}
      <div className="absolute inset-x-0 top-0 h-4 bg-green-600 flex">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-r border-green-700"
            style={{
              backgroundColor: i % 3 === 0 ? '#4ade80' : i % 3 === 1 ? '#16a34a' : '#15803d',
            }}
          />
        ))}
      </div>
      {/* Dirt layer */}
      <div className="absolute inset-x-0 top-4 bottom-0 flex">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-r border-amber-900"
            style={{
              backgroundColor:
                i % 4 === 0 ? '#92400e' : i % 4 === 1 ? '#78350f' : i % 4 === 2 ? '#a16207' : '#854d0e',
            }}
          />
        ))}
      </div>
    </div>
  )
}
