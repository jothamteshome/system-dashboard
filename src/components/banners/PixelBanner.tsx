// Pixel grid full card background — shared by snake-game and pixel-sorter; swap later per card
const gridSvg = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">' +
  '<path d="M 20 0 L 0 0 0 20" fill="none" stroke="#7c3aed" stroke-width="0.5"/>' +
  '</svg>'
)

const pixels: Array<{ top: string; left: string }> = [
  { top: '8%',  left: '5%'  }, { top: '55%', left: '10%' },
  { top: '22%', left: '22%' }, { top: '72%', left: '33%' },
  { top: '12%', left: '48%' }, { top: '45%', left: '60%' },
  { top: '78%', left: '70%' }, { top: '18%', left: '83%' },
  { top: '62%', left: '88%' }, { top: '38%', left: '42%' },
  { top: '90%', left: '52%' }, { top: '32%', left: '75%' },
]

export default function PixelBanner() {
  return (
    <div className="absolute inset-0 bg-violet-950 overflow-hidden">
      {/* Graph paper grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,${gridSvg}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '20px 20px',
        }}
      />
      {/* Scattered highlight pixels */}
      {pixels.map((pos, i) => (
        <div
          key={i}
          className="absolute bg-violet-400 opacity-40"
          style={{ top: pos.top, left: pos.left, width: '4px', height: '4px' }}
        />
      ))}
    </div>
  )
}

