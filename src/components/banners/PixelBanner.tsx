// Default pixel grid banner — shared by snake-game and pixel-sorter; swap later per card
export default function PixelBanner() {
  return (
    <div
      className="h-14 overflow-hidden relative bg-violet-950"
      aria-hidden="true"
    >
      {/* Pixel grid overlay */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,_#a78bfa_1px,_transparent_1px),_linear-gradient(to_bottom,_#a78bfa_1px,_transparent_1px)] bg-[size:8px_8px]" />
      {/* Scattered highlight pixels */}
      <div className="absolute inset-0 opacity-30">
        {[
          { top: '12%', left: '8%' }, { top: '60%', left: '15%' },
          { top: '30%', left: '28%' }, { top: '75%', left: '40%' },
          { top: '15%', left: '55%' }, { top: '50%', left: '65%' },
          { top: '80%', left: '75%' }, { top: '25%', left: '88%' },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-violet-300"
            style={{ top: pos.top, left: pos.left }}
          />
        ))}
      </div>
    </div>
  )
}
