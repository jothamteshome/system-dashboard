// Grass block side — original pixel art, no Mojang assets used
// Colors inspired by natural grass/dirt; pattern is original SVG geometry
const grassSvg = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">' +
  '<rect width="16" height="16" fill="#4a7c20"/>' +
  '<rect x="0" y="0" width="4" height="4" fill="#6aaa2c"/>' +
  '<rect x="8" y="0" width="4" height="4" fill="#38601a"/>' +
  '<rect x="4" y="4" width="4" height="4" fill="#6aaa2c"/>' +
  '<rect x="12" y="4" width="4" height="4" fill="#38601a"/>' +
  '<rect x="0" y="8" width="4" height="4" fill="#38601a"/>' +
  '<rect x="8" y="8" width="4" height="4" fill="#6aaa2c"/>' +
  '<rect x="4" y="12" width="4" height="4" fill="#38601a"/>' +
  '<rect x="12" y="12" width="4" height="4" fill="#6aaa2c"/>' +
  '</svg>'
)

const dirtSvg = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">' +
  '<rect width="16" height="16" fill="#7a5c2e"/>' +
  '<rect x="0" y="0" width="4" height="4" fill="#5c4520"/>' +
  '<rect x="8" y="4" width="4" height="4" fill="#5c4520"/>' +
  '<rect x="4" y="8" width="4" height="4" fill="#5c4520"/>' +
  '<rect x="12" y="12" width="4" height="4" fill="#5c4520"/>' +
  '<rect x="4" y="0" width="4" height="4" fill="#8b6835"/>' +
  '<rect x="12" y="4" width="4" height="4" fill="#8b6835"/>' +
  '<rect x="0" y="8" width="4" height="4" fill="#8b6835"/>' +
  '<rect x="8" y="12" width="4" height="4" fill="#8b6835"/>' +
  '</svg>'
)

export default function MinecraftBanner() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      {/* Grass — top 30% */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '30%',
          backgroundImage: `url("data:image/svg+xml,${grassSvg}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '16px 16px',
          imageRendering: 'pixelated',
        }}
      />
      {/* Dirt — remaining 70% */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          top: '30%',
          backgroundImage: `url("data:image/svg+xml,${dirtSvg}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '16px 16px',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
}

