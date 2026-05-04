// Watch Together card background — YouTube-style play button
export default function CinemaBanner() {
  return (
    <div className="absolute inset-0 bg-neutral-950 overflow-hidden flex items-center justify-center">
      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, #fff 3px, #fff 4px)',
        }}
      />
      {/* Screen frame */}
      <div className="relative w-24 h-16 rounded border border-white/15 flex items-center justify-center bg-white/5">
        {/* YouTube-style play button */}
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <div
            className="w-0 h-0 ml-0.5"
            style={{
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderLeft: '9px solid rgba(255,255,255,0.7)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

