// Pixel sorter banner — diagonal bars graduating dark to light,
// representing pixels sorted by luminance (dark bottom-left → light top-right)
const BARS = [
  { color: '#1a1a1a', offset: -60 },
  { color: '#2d1f4a', offset: -30 },
  { color: '#3b2068', offset: 0   },
  { color: '#4a2580', offset: 30  },
  { color: '#6030a0', offset: 60  },
  { color: '#7c4db8', offset: 90  },
  { color: '#a07cd0', offset: 120 },
  { color: '#d4baee', offset: 150 },
]

export default function PixelBanner() {
  return (
    <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
      {BARS.map((bar, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: '200%',
            height: '22px',
            backgroundColor: bar.color,
            top: `${bar.offset}px`,
            left: '-50%',
            transform: 'rotate(-45deg)',
            transformOrigin: 'center center',
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  )
}

