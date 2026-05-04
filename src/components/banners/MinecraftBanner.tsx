import grassSide from '../../assets/grass_block_side.png'
import dirt from '../../assets/dirt.png'

export default function MinecraftBanner() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      {/* Grass strip — top 25% */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '25%',
          backgroundImage: `url(${grassSide})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          imageRendering: 'pixelated',
        }}
      />
      {/* Dirt — remaining 75% */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          top: '25%',
          backgroundImage: `url(${dirt})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '16px 16px',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
}

